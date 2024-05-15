import { getComponentsController } from '@cms/controllers/component';
import { getTemplatesController } from '@cms/controllers/template';
import Create from '../../../../views/site/create/Create';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create site',
};

const page = async () => {
  const templates = await getTemplatesController();
  const components = await getComponentsController();
  return <Create templates={templates || []} components={components || []} />;
};

export default page;
