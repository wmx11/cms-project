import { Component } from '@prisma/client';
import { Schema } from '../types';
import getPathArray, { checkTopLevel } from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

type TurnIntoComponentProps = {
  schema: Schema[];
  newComponent: Component;
  path: string;
};

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

const turnIntoComponent = (props: TurnIntoComponentProps) => {
  if (!props.schema) {
    console.error('[turnIntoComponent]: No schema provided');
    return null;
  }

  if (!props.newComponent) {
    console.error('[turnIntoComponent]: No component schema provided');
    return null;
  }

  if (!props.path) {
    console.error('[turnIntoComponent]: No path provided');
    return null;
  }

  const { newComponent, path, schema } = props;

  const newComponentSchema = JSON.parse(
    (newComponent.schema as string) || '{}'
  );

  const copySchema = [...schema];
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

  const childrenArray = selectedComponent.props.find(
    (item) => item.type === 'component' && item.name === 'children'
  )?.value as Schema[];

  const indexToReplace = parseInt(pathArray.at(-2) as string, 10);

  if (isNaN(indexToReplace)) {
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
