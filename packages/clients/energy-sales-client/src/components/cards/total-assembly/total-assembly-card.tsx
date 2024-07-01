import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeviceConfigurationContext } from '@/providers/device-configuration.providers';
import { useContext, useMemo } from 'react';

export const TotalAssemblyCard = () => {
  const context = useContext(DeviceConfigurationContext);

  const costFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const { totalDimensions, totalEnergy, totalCost } = useMemo(() => {
    if (!context) {
      return {
        totalDimensions: `${0}FTx${0}FT`,
        totalEnergy: 0,
        totalCost: 0,
      };
    }

    let grid = [];
    let gridI = 0;
    let totalEnergy = 0;
    let totalCost = 0;

    for (let i = 0; i < context?.devices?.length; i++) {
      const device = context.devices[i];

      if (grid.length == 0) {
        grid.push(0);
      }
      if (grid[gridI] + device.dimensions.width <= 100) {
        grid[gridI] += device.dimensions.width;
      } else {
        gridI += 1;
        grid.push(0);
        grid[gridI] += device.dimensions.width;
      }

      totalCost += device.cost.amount;
      totalEnergy += device.energyMeasurement.value;
    }

    const length = grid.length ? grid.length * 10 : 0;
    const width = grid.length ? Math.max(...grid) : 0;

    return {
      totalDimensions: `${width}FTx${length}FT`,
      totalEnergy,
      totalCost,
    };
  }, [context]);

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="pb-0">
        <CardTitle>Total Assembly</CardTitle>
        <CardDescription>
          Understand the total dimensions, energy storage, and cost of your
          current assembly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batteries</TableHead>
              <TableHead>Transformers</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Energy (MWh)</TableHead>
              <TableHead>Total cost ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{context?.storageDevicesCount ?? 0}</TableCell>
              <TableCell>{context?.transformerDevicesCount ?? 0}</TableCell>
              <TableCell>{totalDimensions}</TableCell>
              <TableCell>{totalEnergy}</TableCell>
              <TableCell>{costFormatter.format(totalCost)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
