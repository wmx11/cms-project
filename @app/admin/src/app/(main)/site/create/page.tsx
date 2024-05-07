import { getComponentsController } from '@cms/controllers/component';
import { getTemplatesController } from '@cms/controllers/template';
import Create from '../../../../views/site/create/Create';

const page = async () => {
  const templates = await getTemplatesController();
  const components = await getComponentsController();
  return <Create templates={templates || []} components={components || []} />;
};

export default page;
