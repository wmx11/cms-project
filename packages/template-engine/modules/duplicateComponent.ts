import { PATH_SEPARATOR } from '../constants';
import { Schema } from '../types';
import { getComponentChildrenArray } from './getComponentChildrenArray';
import getPathArray, {
  checkTopLevel,
  getIndexFromPathArray,
} from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

interface DuplicateComponentProps {
  schema: Schema[];
  path: string;
}

const duplicateComponent = (props: DuplicateComponentProps) => {
  if (!props.schema) {
    console.error('[duplicateComponent]: No schema provided');
    return null;
  }

  if (!props.path) {
    console.error('[duplicateComponent]: No path provided');
    return null;
  }

  const { path, schema } = props;

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

  // Creates a copy of the selected component.
  // We do this to drop any referencese to the old component
  // Therefore avoiding manipulating the new component and the old reference
  const selectedComponentCopy: Schema = structuredClone(selectedComponent);

  if (isTopLevel) {
    const componentIndex = copySchema.indexOf(selectedComponent);
    copySchema.splice(componentIndex, 0, selectedComponentCopy);
    return copySchema;
  }

  const childrenArray = getComponentChildrenArray(selectedComponent);

  const componentIndex = getIndexFromPathArray(pathArray, -2);

  if (componentIndex === null) {
    return null;
  }

  const selectedChildComponent = traverseComponentsTree({
    schema: childrenArray,
    path: pathArray.slice(-2).join(PATH_SEPARATOR),
  });

  if (!selectedChildComponent) {
    return null;
  }

  // Creates a copy of the selected component.
  // We do this to drop any referencese to the old component
  // Therefore avoiding manipulating the new component and the old reference
  const selectedChildComponentCopy: Schema = structuredClone(
    selectedChildComponent
  );

  childrenArray.splice(componentIndex, 0, selectedChildComponentCopy);

  return copySchema;
};

export default duplicateComponent;
