import { Schema } from '../types';
import traverseComponentsTree from './traverseComponentsTree';

export interface AddComponentProps {
  schema: Schema[];
  componentSchema: Schema;
  path?: string;
}

const addComponent = (props: AddComponentProps) => {
  if (!props.componentSchema) {
    console.error('[addComponent]: No component schema provided');
    return null;
  }

  if (!props.schema) {
    console.error('[addComponent]: No general schema provided');
    return null;
  }

  const { componentSchema, schema, path } = props;

  const copySchema = structuredClone(schema);
  const copyComponentSchema = structuredClone(componentSchema);

  if (path) {
    const component = traverseComponentsTree({
      path,
      schema: copySchema,
    });

    if (!component) {
      return copySchema;
    }

    if (Array.isArray(component)) {
      return copySchema;
    }

    const childrenArray = component.props.find(
      (item) => item.type === 'component' && item.name === 'children'
    )?.value;

    if (childrenArray && Array.isArray(childrenArray)) {
      childrenArray.push(copyComponentSchema);
    }

    return copySchema;
  }

  copySchema.push(copyComponentSchema);

  return copySchema;
};

export default addComponent;
