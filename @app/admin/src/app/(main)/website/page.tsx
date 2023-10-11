import prisma from '@cms/data/prisma';
import { withProfile } from '@cms/data/profile/getters';
import { Edit, Trash } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
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
    <PageWithHeader title="My websites">
      <div className="grid grid-cols-4 gap-4">
        {websites.map((item, index) => {
          return (
            <Card key={`website_${index}`}>
              <CardBody>
                <p>{item.title}</p>
                <p>Alias: {item.alias}</p>
                <p>Published: {item.is_published.toString()}</p>
              </CardBody>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  color="warning"
                  as={Link}
                  href={routes.website.edit.replace('$id', item.id)}
                  endContent={<Edit />}
                >
                  Edit
                </Button>
                <Button color="danger" endContent={<Trash />}>
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
