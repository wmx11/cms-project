import {
  getComponents
} from '@cms/data/component/getters';
import { getTemplates } from '@cms/packages/data/template/getters';
import { Component, Template } from '@prisma/client';
import Create from '../../../../views/site/create/Create';

const page = async () => {
  const templates = (await getTemplates()) as Template[];
  const components = (await getComponents()) as Component[];
  return <Create templates={templates} components={components} />;
};

export default page;
