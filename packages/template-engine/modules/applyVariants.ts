import { ComponentVariants, Schema } from '../types';
import traverseComponentsTree from './traverseComponentsTree';

type ApplyVariantsProps = {
  schema: Schema[];
  path: string;
  variant: ComponentVariants;
};

/**
 * @deprecated
 */
const applyVariants = (props: ApplyVariantsProps) => {
  if (!props.schema) {
    console.error('[applyVariants]: No schema provided');
    return null;
  }

  if (!props.path) {
    console.error('[applyVariants]: No path provided');
    return null;
  }

  if (!props.variant) {
    console.error('[applyVariants]: No variant provided');
    return null;
  }

  const { path, schema, variant } = props;

  const copySchema = [...schema];

  const component = traverseComponentsTree({
    schema: copySchema,
    path,
  });

  if (!component) {
    return null;
  }

  if (!component.componentVariants) {
    Object.assign(component, { componentVariants: {} });
  }

  component.componentVariants = { ...component.componentVariants, ...variant };

  return copySchema;
};

export default applyVariants;
