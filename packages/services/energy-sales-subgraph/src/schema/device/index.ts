import {
  Device,
  Resolvers,
  DevicesConnection,
} from '@generated/resolvers-types';
import { getPaginatedResponse } from '@schema/utils/get-paginated-response';

export const deviceResolvers: Resolvers = {
  Query: {
    devices: async (_parent, { deviceType, pageArgs }, context) => {
      const args = deviceType ? { deviceType } : {};
      return await getPaginatedResponse<any, Device, DevicesConnection>({
        args,
        collection: context.dataSources.devices.devices,
        pageArgs: pageArgs ?? undefined,
      });
    },
  },
};
