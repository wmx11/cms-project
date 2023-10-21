import { getComponentsByWebsiteId } from '@cms/data/component/getters';
import { getWebsiteDraftSchemaByWebsiteId } from '@cms/data/website/getters';
import WebsiteBuilder from '../../../../../components/Layout/WebsiteBuilder/WebsiteBuilder';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const templateComponents = await getComponentsByWebsiteId(params.id);
  const websiteDraftSchema = await getWebsiteDraftSchemaByWebsiteId(params.id);
  return (
    <WebsiteBuilder
      schema={websiteDraftSchema?.draft_schema || []}
      templateId={websiteDraftSchema?.template?.slug || ''}
      templateComponents={templateComponents}
    />
  );
};

export default page;
