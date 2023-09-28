import parseSchema from './parseSchema';
import { TemplateSchema } from './types';

type Props = {
  context: TemplateSchema;
};

const TemplateRenderer = async ({ context }: Props) => {
  const template = await parseSchema(context.schema, context.metadata.id);

  if (!template || template.length === 0) {
    console.error('There has been an issue rendering the template');
    return null;
  }

  return <>{template}</>;
};

export default TemplateRenderer;
