import { Separator } from '@cms/ui/components/Separator';
import { getServerSession } from 'next-auth';
import AppMenuLinks from './AppMenuLinks';
import AppAvatar from './AppAvatar';

const AppMenu = async () => {
  const session = await getServerSession();

  return (
    <div className="relative h-full">
      <div>
        <AppAvatar session={session} />
        <Separator />
        <AppMenuLinks />
      </div>
    </div>
  );
};

export default AppMenu;
