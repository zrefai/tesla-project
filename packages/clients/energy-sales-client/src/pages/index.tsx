import { DeviceCard } from '@/components/cards/device/device-card';
import { TotalAssemblyCard } from '@/components/cards/total-assembly/total-assembly-card';

export default function Home() {
  return (
    <div className="flex flex-row m-8 gap-8">
      <DeviceCard />
      <div className="flex flex-col w-full">
        <div>
          <TotalAssemblyCard />
        </div>
      </div>
    </div>
  );
}
