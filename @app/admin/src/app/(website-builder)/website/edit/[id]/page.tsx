import { getComponentsByTemplateId } from '@cms/data/component/getters';
import WebsiteBuilder from '../../../../../components/Layout/WebsiteBuilder/WebsiteBuilder';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const components = await getComponentsByTemplateId(params.id);
  return <WebsiteBuilder schema={[]} />;
};

export default page;
