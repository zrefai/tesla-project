import { deviceResolvers } from './device';
import { Scalars } from './scalars';

const resolvers = {
  Query: {
    ...deviceResolvers.Query,
  },
  ...Scalars,
};

export default resolvers;
