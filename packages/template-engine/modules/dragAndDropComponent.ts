import { Schema } from '../types';
import { getComponentChildrenArray } from './getComponentChildrenArray';
import getPathArray, { getIndexFromPathArray } from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

type DragAndDropComponentProps = {
  schema: Schema[];
  selectedComponentPath: string;
  targetComponentPath: string;
  insertPosition: 'beforeend' | 'afterbegin' | 'afterend' | 'beforebegin';
};

const dragAndDropComponent = (props: DragAndDropComponentProps) => {
  if (!props.schema) {
    console.error('[dragAndDropComponent]: No schema provided');
    return null;
  }

  if (!props.selectedComponentPath) {
    console.error('[dragAndDropComponent]: No selectedComponentPath provided');
    return null;
  }

  if (!props.targetComponentPath) {
    console.error('[dragAndDropComponent]: No targetComponentPath provided');
    return null;
  }

  if (!props.insertPosition) {
    console.error('[dragAndDropComponent]: No insertPosition provided');
    return null;
  }

  const { insertPosition, schema, selectedComponentPath, targetComponentPath } =
    props;

  const copySchema = [...schema];

  const selectedComponentParent = traverseComponentsTree({
    path: selectedComponentPath,
    schema: copySchema,
    returnParent: true,
  });

  const targetComponentParent = traverseComponentsTree({
    path: targetComponentPath,
    schema: copySchema,
    returnParent: true,
  });

  if (!targetComponentParent || !selectedComponentParent) {
    console.error(
      '[dragAndDropComponent]: No target or selected component found'
    );
    return copySchema;
  }

  const selectedComponentChildrenArray = getComponentChildrenArray(
    selectedComponentParent
  );

  const targetChildrenArray = getComponentChildrenArray(targetComponentParent);

  const selectedComponentIndex = getIndexFromPathArray(
    getPathArray(selectedComponentPath),
    -2
  );

  const targetComponentIndex = getIndexFromPathArray(
    getPathArray(targetComponentPath),
    -2
  );

  if (selectedComponentIndex === null || targetComponentIndex === null) {
    console.error(
      '[dragAndDropComponent]: Could not retrieve target or selected component index'
    );
    return copySchema;
  }

  const selectedComponent = selectedComponentChildrenArray.splice(
    selectedComponentIndex,
    1
  );

  console.log(
    'selectedComponentPath',
    selectedComponentPath,
    'targetComponentPath',
    targetComponentPath
  );

  if (!selectedComponent) {
    console.error('[dragAndDropComponent]: No selected component found');
    return copySchema;
  }

  switch (insertPosition) {
    case 'afterbegin':
      targetChildrenArray.unshift(selectedComponent[0]);
      break;
    case 'beforeend':
      targetChildrenArray.push(selectedComponent[0]);
      break;
    case 'afterend':
      targetChildrenArray.splice(
        targetComponentIndex + 1,
        0,
        selectedComponent[0]
      );
      break;
    case 'beforebegin':
      targetChildrenArray.splice(targetComponentIndex, 0, selectedComponent[0]);
      break;
    default:
      return copySchema;
  }

  return copySchema;
};

export default dragAndDropComponent;
