import { db } from '@config/db-client';
import { Devices } from '@data/index';

//This interface is used with graphql-codegen to generate types for resolvers context
export interface DataSourceContext {
  dataSources: {
    devices: Devices;
  };
}

export const dataSourceContext: DataSourceContext = {
  dataSources: {
    devices: new Devices(db),
  },
};
