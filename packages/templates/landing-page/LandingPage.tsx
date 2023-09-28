import TemplateRenderer from '@cms/template-engine/TemplateRenderer';
import { TemplateSchema } from '@cms/template-engine/types';

type Props = {
  context: TemplateSchema;
};

const LandingPage = ({ context }: Props) => {
  return <TemplateRenderer context={context} />;
};

export default LandingPage;
