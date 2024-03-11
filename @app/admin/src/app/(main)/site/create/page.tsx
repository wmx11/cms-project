import { getTemplates } from '@cms/packages/data/template/getters';
import { Template } from '@prisma/client';
import Create from '../../../../views/website/create/Create';

const page = async () => {
  const templates = (await getTemplates()) as Template[];
  return <Create templates={templates} />;
};

export default page;
