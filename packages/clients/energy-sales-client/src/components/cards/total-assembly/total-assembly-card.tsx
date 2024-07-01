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
import { AssemblyContext } from '@/providers/device-assembly.providers';
import { useContext, useMemo } from 'react';

export const TotalAssemblyCard = () => {
  const context = useContext(AssemblyContext);

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

    const rowLengths = [];
    let rowI = 0;
    let totalEnergy = 0;
    let totalCost = 0;

    for (const device of context.devices) {
      if (rowLengths.length == 0) {
        rowLengths.push(0);
      }
      if (rowLengths[rowI] + device.dimensions.width <= 100) {
        rowLengths[rowI] += device.dimensions.width;
      } else {
        rowI += 1;
        rowLengths.push(0);
        rowLengths[rowI] += device.dimensions.width;
      }

      totalCost += device.cost.amount;
      totalEnergy += device.energyMeasurement.value;
    }

    const length = rowLengths.length ? rowLengths.length * 10 : 0;
    const width = rowLengths.length ? Math.max(...rowLengths) : 0;

    return {
      totalDimensions: `${width}FTx${length}FT`,
      totalEnergy,
      totalCost,
    };
  }, [context]);

  return (
    <Card className="flex flex-col w-full gap-2">
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
