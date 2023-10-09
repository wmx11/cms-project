import { getTemplates } from '@cms/data/template/getters';
import { Template } from '@prisma/client';
import Create from '../../../../views/website/create/Create';

const page = async () => {
  const templates = (await getTemplates()) as Template[];

  if (!templates.length) {
    return <div>There are no templates to choose from.</div>;
  }

  return <Create templates={templates} />;
};

export default page;
