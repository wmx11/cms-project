import TemplateRenderer from '@cms/packages/template-engine/TemplateRenderer';
import {
  TemplateMetadata,
  TemplateSchema,
} from '@cms/packages/template-engine/types';

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
