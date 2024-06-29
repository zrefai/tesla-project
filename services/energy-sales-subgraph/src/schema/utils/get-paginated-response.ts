import {
  Collection,
  FindOptions,
  ObjectId,
  WithId,
  Document,
  Filter,
} from 'mongodb';
import { GraphQLError } from 'graphql';
import assert from 'assert';
import { PageArgs } from '@generated/resolvers-types';

const QUERY_LIMIT = 21;
const PAGE_LIMIT = 20;

interface GetPaginatedResponseArgs<K, T extends Document, S> {
  args: K;
  collection: Collection<T>;
  pageArgs?: PageArgs;
  options?: FindOptions<T>;
}

export const getPaginatedResponse = async <K, T extends Document, S>({
  args,
  collection,
  pageArgs,
  options,
}: GetPaginatedResponseArgs<K, T, S>): Promise<S> => {
  validatePageArgs(pageArgs);

  const documents = await applyCursorsToEdges(
    args,
    collection,
    pageArgs?.before,
    pageArgs?.after,
    options,
  );

  const edges = documents.length > 0 ? mapEdges(documents, pageArgs) : [];

  const isPreviousPageAvailable = await hasPreviousPage(
    args,
    documents,
    collection,
    pageArgs,
  );

  const isNextPageAvailable = await hasNextPage(
    args,
    documents,
    collection,
    pageArgs,
  );

  return {
    edges,
    pageInfo: {
      totalCount: edges.length,
      hasPreviousPage: isPreviousPageAvailable,
      hasNextPage: isNextPageAvailable,
      startCursor: edges.at(0)?.cursor,
      endCursor: edges.at(edges.length - 1)?.cursor,
    },
  } as S;
};

const applyCursorsToEdges = async <T extends Document, K>(
  args: K,
  collection: Collection<T>,
  before?: string,
  after?: string,
  options?: FindOptions<T>,
) => {
  const query: any = {
    ...args,
  };

  if (before && after) {
    query._id = {
      $lt: new ObjectId(before as string),
      $gt: new ObjectId(after as string),
    };
  } else if (after) {
    query._id = { $gt: new ObjectId(after as string) };
  } else if (before) {
    query._id = { $lt: new ObjectId(before as string) };

    // Documents come back in reverse order because we get the documents just before the cursor, need to reverse the returned docs
    return await collection
      .find(query, options)
      .sort({ _id: -1 })
      .limit(QUERY_LIMIT)
      .toArray()
      .then((data) => data.reverse());
  }

  return await collection
    .find(query)
    .sort({ _id: 1 })
    .limit(QUERY_LIMIT)
    .toArray();
};

const hasPreviousPage = async <K, T extends Document>(
  args: K,
  documents: WithId<T>[],
  collection: Collection<T>,
  pageArgs?: PageArgs,
): Promise<boolean> => {
  if (pageArgs?.last) {
    return documents.length > pageArgs?.last ? true : false;
  }

  if (pageArgs?.before && documents.length > PAGE_LIMIT) {
    return true;
  }

  if (pageArgs?.after) {
    const query = {
      _id: { $lt: documents[0]?._id },
      ...args,
    } as Filter<T>;
    const previousDocs = await collection.find(query).limit(1).toArray();

    return previousDocs.length > 0;
  }

  return false;
};

const hasNextPage = async <K, T extends Document>(
  args: K,
  documents: WithId<T>[],
  collection: Collection<T>,
  pageArgs?: PageArgs,
): Promise<boolean> => {
  if (pageArgs?.first) {
    return documents.length > pageArgs?.first ? true : false;
  }

  if (documents.length > PAGE_LIMIT) {
    return true;
  }

  if (pageArgs?.before) {
    const query = {
      _id: { $gt: documents[documents.length - 1]?._id },
      ...args,
    } as Filter<T>;
    const nextDocs = await collection.find(query).limit(1).toArray();

    return nextDocs.length > 0;
  }

  return false;
};

const mapEdges = <T>(documents: WithId<T>[], pageArgs?: PageArgs) => {
  let index = 0;
  let length = documents.length > PAGE_LIMIT ? PAGE_LIMIT : documents.length;

  if (pageArgs) {
    const { first, last, before, after } = pageArgs;

    if (before && after) {
      // Do nothing
    } else if (before && documents.length > PAGE_LIMIT) {
      // Because query limit is 21 docs, and page limit is 20 docs, the 1st doc should be avoided as it is technically the 21st doc (see applyCursorsToEdges logic)
      index += 1;
    }

    if (first && documents.length > first) {
      length = first;
    }

    if (last && documents.length > last) {
      index = length - last;
    }
  }

  const edges = [];
  for (index; index < length; index++) {
    edges.push({
      node: documents[index],
      cursor: new ObjectId(documents[index]._id),
    });
  }

  return edges;
};

const validatePageArgs = (pageArgs?: PageArgs) => {
  if (!pageArgs) return;

  const { first, last, before, after } = pageArgs;

  if (first && last) {
    throw new GraphQLError(
      'Page arguments `first` and `last` cannot be defined in the same query.',
    );
  }

  if (before && after) {
    const beforeId = new ObjectId(before as string);
    const afterId = new ObjectId(after as string);

    assert(
      afterId < beforeId,
      new GraphQLError(
        'Page arguments `before` and `after` are invalid. `after` cursor cannot be greater than or equal to `before` cursor.',
      ),
    );
  }
};
