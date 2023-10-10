import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';
import { getServerSession } from 'next-auth';
import routes from '../../../utils/routes';
import { PROJECT_NAME } from '@cms/config/constants';

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
          <span className="font-bold">{PROJECT_NAME}</span>
          <Link isBlock href="/" color="foreground">
            Dashboard
          </Link>
          <Link isBlock href={routes.website.default} color="foreground">
            My Websites
          </Link>
          <Link isBlock href="#" color="foreground">
            New Website
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="font-bold">Blog Posts</span>
          <Link isBlock href="#" color="foreground">
            View All
          </Link>
          <Link isBlock href="#" color="foreground">
            New Blog Post
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <span className="font-bold">Testimonials</span>
          <Link isBlock href="#" color="foreground">
            View All
          </Link>
          <Link isBlock href="#" color="foreground">
            Create New Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
