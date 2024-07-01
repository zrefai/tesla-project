import { Device } from '@/__generated__/graphql';
import { GET_TRANSFORMER_DEVICES } from '@/queries/get-transformer-devices.query';
import { useQuery } from '@apollo/client';
import { createContext, useState } from 'react';

export type AssemblyContextType = {
  devices: Device[];
  storageDevicesCount: number;
  transformerDevicesCount: number;
  addToDeviceAssembly: (device: Device) => void;
  removeFromDeviceAssembly: (deviceId: string) => void;
};

export const AssemblyContext = createContext<AssemblyContextType | null>(null);

const AssemblyProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [deviceAssembly, setDeviceAssembly] = useState<Device[]>([]);
  const [storageDevicesCount, setStorageDevicesCount] = useState(0);
  const [transformerDevicesCount, setTransformerDevicesCount] = useState(0);

  const { data } = useQuery(GET_TRANSFORMER_DEVICES);
  // Since only 1 transformer exists in data set, we can grab the first one
  const transformerDevice = data?.devices.edges[0]?.node as Device;

  const addToDeviceAssembly = (device: Device) => {
    const updatedAssembly = [...deviceAssembly, device];

    if (device.deviceType === 'STORAGE') {
      // Add a transformer for every 4 storage devices in the current configuration
      if ((storageDevicesCount + 1) % 4 == 0) {
        const leastNumberOfTransformersRequired = storageDevicesCount / 4;
        let updatedTransformerDeviceCount = transformerDevicesCount;
        while (
          updatedTransformerDeviceCount < leastNumberOfTransformersRequired
        ) {
          updatedTransformerDeviceCount += 1;
          updatedAssembly.push(transformerDevice);
        }
        setTransformerDevicesCount(updatedTransformerDeviceCount);
      }
      setStorageDevicesCount(storageDevicesCount + 1);
    } else {
      setTransformerDevicesCount(transformerDevicesCount + 1);
    }

    setDeviceAssembly(updatedAssembly);
  };

  const removeFromDeviceAssembly = (deviceId: string) => {
    const updatedConfiguration = [...deviceAssembly];
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
    setDeviceAssembly(updatedConfiguration);
  };

  return (
    <AssemblyContext.Provider
      value={{
        devices: deviceAssembly ?? [],
        storageDevicesCount,
        transformerDevicesCount,
        addToDeviceAssembly,
        removeFromDeviceAssembly,
      }}
    >
      {children}
    </AssemblyContext.Provider>
  );
};

export default AssemblyProvider;
