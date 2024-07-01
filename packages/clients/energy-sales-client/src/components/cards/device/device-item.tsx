import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { AssemblyContext } from '@/providers/device-assembly.providers';
import { Device } from '@/__generated__/graphql';

interface DeviceItemProps {
  device: Device;
}

export const DeviceItem = ({ device }: DeviceItemProps) => {
  const context = useContext(AssemblyContext);
  const [count, setCount] = useState(0);
  const dimensions = `${device.dimensions.width}${device.dimensions.unit}x${device.dimensions.length}${device.dimensions.unit}`;
  const energyMeasurement = `${device.energyMeasurement.value}${device.energyMeasurement.unit}`;
  const isDeviceTransformer = device.deviceType === 'TRANSFORMER';
  const isRemoveTransformerRestricted =
    isDeviceTransformer &&
    context &&
    context.transformerDevicesCount <= context.storageDevicesCount / 4;

  const costFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: device.cost.currency,
  });

  useEffect(() => {
    // When transformer count in context changes, we need to update the transformer device item here
    if (
      context &&
      isDeviceTransformer &&
      context.transformerDevicesCount != count
    ) {
      setCount(context.transformerDevicesCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const onAdd = () => {
    setCount(count + 1);
    if (context) {
      context.addToDeviceAssembly(device);
    }
  };

  const onSubtract = () => {
    if (count - 1 >= 0) {
      if (isRemoveTransformerRestricted) {
        return;
      }
      setCount(count - 1);
      context?.removeFromDeviceAssembly(device.id);
    }
  };

  return (
    <TableRow key={device.id}>
      <TableCell className="font-medium">{device.name}</TableCell>
      <TableCell>{dimensions}</TableCell>
      <TableCell>{energyMeasurement}</TableCell>
      <TableCell>{costFormatter.format(device.cost.amount)}</TableCell>
      <TableCell className="flex flex-row items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSubtract}>
          -
        </Button>
        <p className="w-5 text-center">{count}</p>
        <Button variant="outline" size="sm" onClick={onAdd}>
          +
        </Button>
      </TableCell>
    </TableRow>
  );
};
