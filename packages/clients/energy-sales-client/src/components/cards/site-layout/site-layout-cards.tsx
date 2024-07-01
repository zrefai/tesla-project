import { Device } from '@/__generated__/graphql';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssemblyContext } from '@/providers/device-assembly.providers';
import { useContext, useMemo } from 'react';

export const SiteLayoutCard = () => {
  const context = useContext(AssemblyContext);

  const { siteLayout } = useMemo(() => {
    if (!context) {
      return { siteLayout: [] };
    }

    const rowLengths = [];
    const siteLayout: Device[][] = [];
    let rowI = 0;

    for (const device of context.devices) {
      if (rowLengths.length == 0) {
        rowLengths.push(0);
        siteLayout.push([]);
      }
      if (rowLengths[rowI] + device.dimensions.width <= 100) {
        rowLengths[rowI] += device.dimensions.width;
        siteLayout[rowI].push(device);
      } else {
        rowI += 1;
        rowLengths.push(0);
        rowLengths[rowI] += device.dimensions.width;
        siteLayout.push([device]);
      }
    }

    return { siteLayout };
  }, [context]);

  const renderSiteLayout = () => {
    if (siteLayout) {
      if (siteLayout.length === 0) {
        return (
          <CardContent className="h-full content-center">
            <p className="text-center">
              No devices have been added to the assembly
            </p>
          </CardContent>
        );
      } else {
        return (
          <CardContent className="flex flex-col h-full items-center">
            <div id="SiteLayoutBox" className="w-full">
              {siteLayout.map((row, index) => {
                return (
                  <div
                    key={`SiteLayoutRow${index}`}
                    className="flex flex-row my-1"
                  >
                    {row.map((device, index) => {
                      const siteLayoutBox =
                        document.getElementById('SiteLayoutBox');
                      const rowWidth = siteLayoutBox?.offsetWidth ?? 700;
                      const width = (device.dimensions.width / 100) * rowWidth;
                      return (
                        <div
                          key={`${device.id}${index}`}
                          className={`flex h-12 justify-center items-center border-solid border-2 rounded-md p-2`}
                          style={{ width: `${width}px` }}
                        >
                          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {device.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </CardContent>
        );
      }
    }
    return null;
  };

  return (
    <Card className="flex flex-col w-full h-full gap-2">
      <CardHeader>
        <CardTitle>Site Layout</CardTitle>
        <CardDescription>
          View your potential site layout. Maximum width of site is capped at
          100FT.
        </CardDescription>
      </CardHeader>
      {renderSiteLayout()}
    </Card>
  );
};
