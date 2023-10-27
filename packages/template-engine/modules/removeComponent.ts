import { Schema } from '../types';
import getPathArray, { checkTopLevel } from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

type RemoveComponentProps = {
  schema: Schema[];
  path: string;
};

const removeComponent = (props: RemoveComponentProps) => {
  if (!props.schema) {
    console.error('[removeComponent]: No schema provided');
    return null;
  }

  if (!props.path) {
    console.error('[removeComponent]: No path provided');
    return null;
  }

  const { path, schema } = props;

  const copySchema = [...schema];

  const pathArray = getPathArray(path);
  const isTopLevel = checkTopLevel(pathArray);
  const deleteIndex = parseInt(pathArray.slice(-2).at(0) as string, 10);

  // Remove items from the top level
  if (isTopLevel) {
    copySchema.splice(deleteIndex, 1);
    return copySchema;
  }

  const parentElement = traverseComponentsTree({
    schema: copySchema,
    returnParent: true,
    path,
  });

  if (!parentElement) {
    return null;
  }

  // Remove items from the childrens array
  const children = parentElement.props.find(
    (item) => item.type === 'component' && item.name === 'children'
  )?.value as Schema[];

  children.splice(deleteIndex, 1);

  return copySchema;
};

export default removeComponent;
