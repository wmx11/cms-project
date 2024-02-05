import prisma from '@cms/packages/data/prisma';
import { withProfile } from '@cms/packages/data/profile/getters';
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
  const websites = await withProfile(async (profile) => {
    return await prisma.website.findMany({
      where: {
        profile_id: profile?.id,
      },
      select: {
        is_published: true,
        alias: true,
        title: true,
        id: true,
      },
    });
  });

  return (
    <PageWithHeader>
      <div className="grid grid-cols-5 gap-8">
        {websites.map((item, index) => {
          return (
            <Card key={`website_${index}`}>
              <CardHeader></CardHeader>
              <CardContent>
                <p>{item.title}</p>
                <p>Alias: {item.alias}</p>
                <p>Published: {item.is_published.toString()}</p>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="secondary" asChild>
                  <Link href={routes.website.edit.replace('$id', item.id)}>
                    <Edit className="h-3 w-3 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive">
                  <Trash className="h-3 w-3 mr-2" />
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
