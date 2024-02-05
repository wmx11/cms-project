import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@cms/packages/ui/components/Avatar';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const AppMenu = async () => {
  const session = await getServerSession();

  return (
    <div className="[&>*]:p-4">
      <div className="">
        <Avatar>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name || ''}</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col space-y-4">
          <Link href="/">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
