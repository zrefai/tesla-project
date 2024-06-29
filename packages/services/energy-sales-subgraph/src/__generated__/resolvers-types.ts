import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DataSourceContext } from '../schema/data-source-context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type Cost = {
  __typename?: 'Cost';
  amount: Scalars['Float']['output'];
  currency: Currency;
};

export enum Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

export type Device = {
  __typename?: 'Device';
  cost: Cost;
  deviceType: DeviceType;
  dimensions: Dimensions;
  energyMeasurement: EnergyMeasurement;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  releaseDate?: Maybe<Scalars['String']['output']>;
};

export type DeviceEdge = {
  __typename?: 'DeviceEdge';
  cursor: Scalars['Cursor']['output'];
  node: Device;
};

export enum DeviceType {
  Storage = 'STORAGE',
  Transformer = 'TRANSFORMER'
}

export type DevicesConnection = {
  __typename?: 'DevicesConnection';
  edges: Array<Maybe<DeviceEdge>>;
  pageInfo: PageInfo;
};

export type Dimensions = {
  __typename?: 'Dimensions';
  length: Scalars['Float']['output'];
  unit: DistanceUnit;
  width: Scalars['Float']['output'];
};

export enum DistanceUnit {
  Ft = 'FT',
  Km = 'KM',
  M = 'M'
}

export type EnergyMeasurement = {
  __typename?: 'EnergyMeasurement';
  unit: EnergyUnit;
  value: Scalars['Float']['output'];
};

export enum EnergyUnit {
  GWh = 'GWh',
  Joule = 'JOULE',
  KWh = 'KWh',
  MWh = 'MWh'
}

export type PageArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['PositiveInt']['input']>;
  last?: InputMaybe<Scalars['PositiveInt']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['Cursor']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  devices?: Maybe<DevicesConnection>;
};


export type QueryDevicesArgs = {
  deviceType?: InputMaybe<DeviceType>;
  pageArgs?: InputMaybe<PageArgs>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Cost: ResolverTypeWrapper<Cost>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Currency: Currency;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
  Device: ResolverTypeWrapper<Device>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DeviceEdge: ResolverTypeWrapper<DeviceEdge>;
  DeviceType: DeviceType;
  DevicesConnection: ResolverTypeWrapper<DevicesConnection>;
  Dimensions: ResolverTypeWrapper<Dimensions>;
  DistanceUnit: DistanceUnit;
  EnergyMeasurement: ResolverTypeWrapper<EnergyMeasurement>;
  EnergyUnit: EnergyUnit;
  PageArgs: PageArgs;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  Query: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Cost: Cost;
  Float: Scalars['Float']['output'];
  Cursor: Scalars['Cursor']['output'];
  Device: Device;
  String: Scalars['String']['output'];
  DeviceEdge: DeviceEdge;
  DevicesConnection: DevicesConnection;
  Dimensions: Dimensions;
  EnergyMeasurement: EnergyMeasurement;
  PageArgs: PageArgs;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  Query: {};
}>;

export type ContactDirectiveArgs = {
  description?: Maybe<Scalars['String']['input']>;
  email?: Maybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ContactDirectiveResolver<Result, Parent, ContextType = DataSourceContext, Args = ContactDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CostResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Cost'] = ResolversParentTypes['Cost']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export type DeviceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Device']>, { __typename: 'Device' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  cost?: Resolver<ResolversTypes['Cost'], ParentType, ContextType>;
  deviceType?: Resolver<ResolversTypes['DeviceType'], ParentType, ContextType>;
  dimensions?: Resolver<ResolversTypes['Dimensions'], ParentType, ContextType>;
  energyMeasurement?: Resolver<ResolversTypes['EnergyMeasurement'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeviceEdgeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DeviceEdge'] = ResolversParentTypes['DeviceEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Device'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DevicesConnectionResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DevicesConnection'] = ResolversParentTypes['DevicesConnection']> = ResolversObject<{
  edges?: Resolver<Array<Maybe<ResolversTypes['DeviceEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DimensionsResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Dimensions'] = ResolversParentTypes['Dimensions']> = ResolversObject<{
  length?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnergyMeasurementResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['EnergyMeasurement'] = ResolversParentTypes['EnergyMeasurement']> = ResolversObject<{
  unit?: Resolver<ResolversTypes['EnergyUnit'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  devices?: Resolver<Maybe<ResolversTypes['DevicesConnection']>, ParentType, ContextType, Partial<QueryDevicesArgs>>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  Cost?: CostResolvers<ContextType>;
  Cursor?: GraphQLScalarType;
  Device?: DeviceResolvers<ContextType>;
  DeviceEdge?: DeviceEdgeResolvers<ContextType>;
  DevicesConnection?: DevicesConnectionResolvers<ContextType>;
  Dimensions?: DimensionsResolvers<ContextType>;
  EnergyMeasurement?: EnergyMeasurementResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PositiveInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = DataSourceContext> = ResolversObject<{
  contact?: ContactDirectiveResolver<any, any, ContextType>;
}>;
