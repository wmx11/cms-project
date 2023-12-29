import routes from '@admin/utils/routes';
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
    <div>
      <div className="border-b p-4">
        <Avatar>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name || ''}</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-8 p-4">
        <div className="flex flex-col space-y-4">
          <Link href="/">Dashboard</Link>
          <Link href={routes.website.default}>My websites</Link>
          <Link href={routes.blog.default}>Blog posts</Link>
          <Link href={routes.testimonials.default}>Testimonials</Link>
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
