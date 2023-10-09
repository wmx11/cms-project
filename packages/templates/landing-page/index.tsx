import TemplateRenderer from '@cms/template-engine/TemplateRenderer';
import { TemplateMetadata, TemplateSchema } from '@cms/template-engine/types';

type Props = {
  context: TemplateSchema;
};

const LandingPage = ({ context }: Props) => {
  // return <TemplateRenderer context={context} />;
};

export default LandingPage;

export const schema: TemplateMetadata = {
  name: 'Landing Page',
  slug: 'landing-page',
  description: 'This is a sample landing page template',
  category: 'landing',
};
