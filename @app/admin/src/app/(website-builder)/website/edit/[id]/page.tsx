import { getComponentsByWebsiteId } from '@cms/packages/data/component/getters';
import { getWebsiteDraftSchemaByWebsiteId } from '@cms/packages/data/website/getters';
import BuilderPage from '../../_components/Builder/BuilderPage';
import { initialStyles } from '@cms/template-engine/styles/jssStyles';

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const templateComponents = await getComponentsByWebsiteId(params.id);
  const websiteDraftSchema = await getWebsiteDraftSchemaByWebsiteId(params.id);
  return (
    <BuilderPage
      styles={websiteDraftSchema?.styles_schema || initialStyles}
      schema={websiteDraftSchema?.draft_schema}
      templateId={websiteDraftSchema?.template?.slug || ''}
      templateComponents={templateComponents}
    />
  );
};

export default page;
