import db from '@cms/db';
import { withUser } from '@cms/packages/data/user/getters';
import { Button } from '@cms/packages/ui/components/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@cms/packages/ui/components/Card';
import { Edit, Trash } from '@cms/packages/ui/components/Icons';
import Link from 'next/link';
import PageWithHeader from '../../../components/Layout/PageWithHeader';
import routes from '../../../utils/routes';

const page = async () => {
  const sites = await withUser(async (user) => {
    return await db.site.findMany({
      where: {
        user_id: user?.id,
      },
    });
  });

  return (
    <PageWithHeader>
      <div className="grid grid-cols-5 gap-8">
        {sites.map((item, index) => {
          return (
            <Card key={`site_${index}`}>
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
    </PageWithHeader>
  );
};

export default page;
