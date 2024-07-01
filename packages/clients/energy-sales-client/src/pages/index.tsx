import { DeviceCard } from '@/components/cards/device/device-card';
import { SiteLayoutCard } from '@/components/cards/site-layout/site-layout-cards';
import { TotalAssemblyCard } from '@/components/cards/total-assembly/total-assembly-card';

export default function Home() {
  return (
    <div className="flex flex-row m-8 gap-8">
      <DeviceCard />
      <div className="flex flex-col w-full gap-8">
        <div className="flex">
          <TotalAssemblyCard />
        </div>
        <div className="flex h-full">
          <SiteLayoutCard />
        </div>
      </div>
    </div>
  );
}
