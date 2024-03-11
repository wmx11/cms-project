import routes from '@admin/utils/routes';
import db from '@cms/db';
import { withUser } from '@cms/packages/data/user/getters';
import { Button } from '@cms/ui/components/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@cms/ui/components/Card';
import { Edit, Trash } from '@cms/ui/components/Icons';
import Link from 'next/link';

const Homepage = async () => {
  const sites = await withUser(async (user) => {
    return await db.site.findMany({
      where: {
        user_id: user?.id,
      },
      select: {
        is_published: true,
        alias: true,
        id: true,
      },
    });
  });
  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="space-y-2">
          <Card key={`website`}>
            <CardHeader></CardHeader>
            <CardContent>
              <div className="bg-red-200 p-8"></div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <div>
            <p className="text-sm">Alias: </p>
          </div>
        </div>
        <div className="space-y-2">
          <Card key={`website`}>
            <CardHeader></CardHeader>
            <CardContent>
              <div className="bg-red-200 p-8"></div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <div>
            <p className="text-sm">Alias: </p>
          </div>
        </div>
        <div className="space-y-2">
          <Card key={`website`} className="overflow-hidden min-h-[180px] relative">
            <CardContent className="m-0 p-0">
              <div className="bg-red-200 p-8 absolute inset-0"></div>
            </CardContent>
          </Card>
          <div>
            <p className="text-sm">Alias: </p>
          </div>
        </div>

        {sites.map((item, index) => {
          return (
            <Card key={`website_${index}`}>
              <CardHeader></CardHeader>
              <CardContent>
                <p>Alias: {item.alias}</p>
                <p>Published: {item.is_published.toString()}</p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="secondary" asChild>
                  <Link href={routes.site.edit.replace('$id', item.id)}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive">
                  <Trash className="mr-2 h-3 w-3" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Homepage;
