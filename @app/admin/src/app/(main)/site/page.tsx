import GridWrapper from '@admin/components/layout/GridWrapper';
import routes from '@admin/utils/routes';
import { getUserSitesController } from '@cms/controllers/site';
import { Metadata } from 'next';
import Link from 'next/link';
import Card from '../_components/Card';

export const metadata: Metadata = {
  title: 'My files',
};

const page = async () => {
  const sites = await getUserSitesController();

  return (
    <GridWrapper>
      {sites?.map((item, index) => (
        <Link
          key={`site_${index}`}
          href={routes.site.edit.replace('$id', item.id)}
        >
          <Card
            description={item.site_page_data.description || ''}
            title={item.site_page_data.title || ''}
            date={item.site_page_data.date_updated}
            dateLabel="Edited"
          />
        </Link>
      ))}
    </GridWrapper>
  );
};

export default page;
