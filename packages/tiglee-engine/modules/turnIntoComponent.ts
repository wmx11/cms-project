import { Schema } from '../types';
import { getComponentChildrenArray } from './getComponentChildrenArray';
import getPathArray, {
  checkTopLevel,
  getIndexFromPathArray,
} from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

const mapSelectedComponentPropsToComponentSchema = (
  selectedComponent: Schema,
  newComponent: Schema
) => {
  const mappedComponent = { ...newComponent };
  selectedComponent?.props.forEach((item) => {
    const propToMap = mappedComponent.props.find(
      (prop) => prop.name === item.name && prop.type === item.type
    );

    if (!propToMap) {
      return;
    }

    propToMap.value = item.value;
  });

  return mappedComponent;
};

export interface TurnIntoComponentProps {
  schema: Schema[];
  componentSchema: Schema;
  path: string;
}

const turnIntoComponent = (props: TurnIntoComponentProps) => {
  if (!props.schema) {
    console.error('[turnIntoComponent]: No schema provided');
    return null;
  }

  if (!props.componentSchema) {
    console.error('[turnIntoComponent]: No component schema provided');
    return null;
  }

  if (!props.path) {
    console.error('[turnIntoComponent]: No path provided');
    return null;
  }

  const { componentSchema, path, schema } = props;

  const newComponentSchema = structuredClone(componentSchema);
  const copySchema = structuredClone(schema);
  const pathArray = getPathArray(path);
  const isTopLevel = checkTopLevel(pathArray);

  const selectedComponent = traverseComponentsTree({
    schema: copySchema,
    returnParent: !isTopLevel,
    path,
  });

  if (!selectedComponent) {
    return null;
  }

  if (isTopLevel) {
    const indexToReplace = copySchema.indexOf(selectedComponent as Schema);
    const newMappedComponent = mapSelectedComponentPropsToComponentSchema(
      selectedComponent,
      newComponentSchema
    );
    copySchema.splice(indexToReplace, 1, newMappedComponent);
    return copySchema;
  }

  const childrenArray = getComponentChildrenArray(selectedComponent);

  const indexToReplace = getIndexFromPathArray(pathArray, -2);

  if (indexToReplace === null) {
    return null;
  }

  const newMappedComponent = mapSelectedComponentPropsToComponentSchema(
    childrenArray[indexToReplace],
    newComponentSchema
  );

  childrenArray.splice(indexToReplace, 1, newMappedComponent);

  return copySchema;
};

export default turnIntoComponent;
