import { useQuery } from '@apollo/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { DeviceItem } from './device-item';
import { GET_DEVICES } from '@/queries/get-devices.query';

export const DeviceCard = () => {
  const { loading, data } = useQuery(GET_DEVICES);

  return (
    <Card className="flex flex-col h-fit gap-2">
      <CardHeader className="pb-0">
        <CardTitle>Available Devices</CardTitle>
        <CardDescription className="w-[600px]">
          Add any device to your assembly. For every 4 batteries added, a
          transformer is automatically added to your assembly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Device</TableHead>
              <TableHead className="w-[50px]">Dimensions</TableHead>
              <TableHead className="w-[50px]">Energy</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableBody>
              <DeviceItemTableSkeleton />
              <DeviceItemTableSkeleton />
              <DeviceItemTableSkeleton />
              <DeviceItemTableSkeleton />
              <DeviceItemTableSkeleton />
            </TableBody>
          ) : (
            <TableBody>
              {data?.devices &&
                data.devices.edges.map(
                  (edge) =>
                    edge?.node && (
                      <DeviceItem key={edge.node.id} device={edge.node} />
                    )
                )}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
};

const DeviceItemTableSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[70px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[70px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-[100px]" />
      </TableCell>
    </TableRow>
  );
};
