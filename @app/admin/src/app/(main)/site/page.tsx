import GridWrapper from '@admin/components/layout/GridWrapper';
import routes from '@admin/utils/routes';
import { withUser } from '@cms/data/user/getters';
import db from '@cms/db';
import Link from 'next/link';
import Card from '../_components/Card';

const page = async () => {
  const sites = await withUser(async (user) => {
    if (!user) {
      return;
    }

    return db.site.findMany({
      where: {
        user_id: user?.id,
      },
      select: {
        alias: true,
        id: true,
        site_page_data: {
          select: {
            title: true,
            description: true,
            image: true,
          },
        },
      },
    });
  });

  return (
    <GridWrapper>
      {sites?.map((item, index) => (
        <Link
          key={`site_${index}`}
          href={routes.site.edit.replace('$id', item.id)}
        >
          <Card
            description={item.site_page_data.description || ''}
            name={item.site_page_data.title || ''}
            alias={item.alias}
          />
        </Link>
      ))}
    </GridWrapper>
  );
};

export default page;
