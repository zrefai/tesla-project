import { Device } from '@/__generated__/graphql';
import { GET_TRANSFORMER_DEVICES } from '@/queries/get-transformer-devices.query';
import { useQuery } from '@apollo/client';
import { createContext, useState } from 'react';

export type DeviceConfigurationContextType = {
  devices: Device[];
  storageDevicesCount: number;
  transformerDevicesCount: number;
  addToDeviceConfiguration: (device: Device) => void;
  removeFromDeviceConfiguration: (deviceId: string) => void;
};

export const DeviceConfigurationContext =
  createContext<DeviceConfigurationContextType | null>(null);

const DeviceConfigurationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [deviceConfiguration, setDeviceConfiguration] = useState<Device[]>([]);
  const [storageDevicesCount, setStorageDevicesCount] = useState(0);
  const [transformerDevicesCount, setTransformerDevicesCount] = useState(0);

  const { data } = useQuery(GET_TRANSFORMER_DEVICES);
  // Since only 1 transformer exists in data set, we can grab the first one
  const transformerDevice = data?.devices.edges[0]?.node as Device;

  const addToDeviceConfiguration = (device: Device) => {
    const updatedConfiguration = [...deviceConfiguration, device];

    if (device.deviceType === 'STORAGE') {
      // Add a transformer for every 4 storage devices in the current configuration
      if ((storageDevicesCount + 1) % 4 == 0) {
        const leastNumberOfTransformersRequired = storageDevicesCount / 4;
        let updatedTransformerDeviceCount = transformerDevicesCount;
        while (
          updatedTransformerDeviceCount < leastNumberOfTransformersRequired
        ) {
          updatedTransformerDeviceCount += 1;
          updatedConfiguration.push(transformerDevice);
        }
        setTransformerDevicesCount(updatedTransformerDeviceCount);
      }
      setStorageDevicesCount(storageDevicesCount + 1);
    } else {
      setTransformerDevicesCount(transformerDevicesCount + 1);
    }

    setDeviceConfiguration(updatedConfiguration);
  };

  const removeFromDeviceConfiguration = (deviceId: string) => {
    const updatedConfiguration = [...deviceConfiguration];
    let n = updatedConfiguration.length;

    // Find index of last device with matching device ID
    while (n--) {
      if (deviceId == updatedConfiguration[n].id) {
        break;
      }
    }

    if (updatedConfiguration[n].deviceType === 'STORAGE') {
      setStorageDevicesCount(storageDevicesCount - 1);
    } else {
      setTransformerDevicesCount(transformerDevicesCount - 1);
    }

    updatedConfiguration.splice(n, 1);
    setDeviceConfiguration(updatedConfiguration);
  };

  return (
    <DeviceConfigurationContext.Provider
      value={{
        devices: deviceConfiguration ?? [],
        storageDevicesCount,
        transformerDevicesCount,
        addToDeviceConfiguration,
        removeFromDeviceConfiguration,
      }}
    >
      {children}
    </DeviceConfigurationContext.Provider>
  );
};

export default DeviceConfigurationProvider;
