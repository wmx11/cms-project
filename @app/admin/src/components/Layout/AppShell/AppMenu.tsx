import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';
import { getServerSession } from 'next-auth';
import routes from '../../../utils/routes';

const AppMenu = async () => {
  const session = await getServerSession();

  return (
    <div>
      <div className="border-b p-4">
        <User
          name={session?.user?.name}
          description={session?.user?.email}
          avatarProps={{
            src: session?.user?.image as string,
          }}
          as="button"
        />
      </div>
      <div className="space-y-8 p-4">
        <div className="flex flex-col space-y-4">
          <Link isBlock href="/" color="foreground">
            Dashboard
          </Link>
          <Link isBlock href={routes.website.default} color="foreground">
            My websites
          </Link>
          <Link isBlock href={routes.blog.default} color="foreground">
            Blog posts
          </Link>
          <Link isBlock href={routes.testimonials.default} color="foreground">
            Testimonials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
