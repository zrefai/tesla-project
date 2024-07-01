/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  devices: DevicesConnection;
};


export type QueryDevicesArgs = {
  deviceType?: InputMaybe<DeviceType>;
  pageArgs?: InputMaybe<PageArgs>;
};

export type GetDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDevicesQuery = { __typename?: 'Query', devices: { __typename?: 'DevicesConnection', edges: Array<{ __typename?: 'DeviceEdge', node: { __typename?: 'Device', id: string, name: string, releaseDate?: string | null, deviceType: DeviceType, cost: { __typename?: 'Cost', amount: number, currency: Currency }, dimensions: { __typename?: 'Dimensions', length: number, width: number, unit: DistanceUnit }, energyMeasurement: { __typename?: 'EnergyMeasurement', value: number, unit: EnergyUnit } } } | null> } };

export type GetTransformerDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransformerDevicesQuery = { __typename?: 'Query', devices: { __typename?: 'DevicesConnection', edges: Array<{ __typename?: 'DeviceEdge', cursor: any, node: { __typename?: 'Device', id: string, name: string, releaseDate?: string | null, deviceType: DeviceType, cost: { __typename?: 'Cost', amount: number, currency: Currency }, dimensions: { __typename?: 'Dimensions', length: number, width: number, unit: DistanceUnit }, energyMeasurement: { __typename?: 'EnergyMeasurement', value: number, unit: EnergyUnit } } } | null> } };


export const GetDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"energyMeasurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDevicesQuery, GetDevicesQueryVariables>;
export const GetTransformerDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransformerDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceType"},"value":{"kind":"EnumValue","value":"TRANSFORMER"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"energyMeasurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetTransformerDevicesQuery, GetTransformerDevicesQueryVariables>;