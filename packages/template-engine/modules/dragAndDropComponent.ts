import { PATH_SEPARATOR } from '../constants';
import { Schema } from '../types';
import { getComponentChildrenArray } from './getComponentChildrenArray';
import getPathArray, { getIndexFromPathArray } from './getPathArray';
import traverseComponentsTree from './traverseComponentsTree';

interface DragAndDropComponentProps {
  schema: Schema[];
  selectedComponentPath: string;
  targetComponentPath: string;
  insertPosition: 'beforeend' | 'afterbegin' | 'afterend' | 'beforebegin';
}

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

  const targetComponent = traverseComponentsTree({
    path: targetComponentPath,
    schema: copySchema,
    returnParent:
      insertPosition === 'afterend' || insertPosition === 'beforebegin',
  });

  if (!targetComponent || !selectedComponentParent) {
    console.error(
      '[dragAndDropComponent]: No target or selected component found'
    );
    return copySchema;
  }

  const selectedComponentPathArray = getPathArray(selectedComponentPath);

  const targetComponentPathArray = getPathArray(targetComponentPath);

  const isSelectedAndTargetComponentsInSameArray =
    selectedComponentPathArray.slice(0, -2).join(PATH_SEPARATOR) ===
    targetComponentPathArray.slice(0, -2).join(PATH_SEPARATOR);

  const selectedComponentIndex = getIndexFromPathArray(
    selectedComponentPathArray,
    -2
  );

  const targetComponentIndex = getIndexFromPathArray(
    targetComponentPathArray,
    -2
  );

  const targetChildrenArray = getComponentChildrenArray(targetComponent);

  if (selectedComponentIndex === null || targetComponentIndex === null) {
    console.error(
      '[dragAndDropComponent]: Could not retrieve target or selected component index'
    );
    return copySchema;
  }

  const selectedComponent = getComponentChildrenArray(
    selectedComponentParent
  ).splice(selectedComponentIndex, 1)[0];

  switch (insertPosition) {
    case 'afterbegin':
      targetChildrenArray.unshift(selectedComponent);
      break;
    case 'beforeend':
      targetChildrenArray.push(selectedComponent);
      break;
    case 'afterend':
      // We need to add +1 to the index if the selected element is no in the same array as the target element
      // If the selected element is in the same array as the target element, we don't add a +1 because
      // When we splice the selected component (above switch statement), we modify the targetChildrenArray and it loses 1 item, therefore its length reduces by 1.
      // By adding + 1 we would jump through 2 elements instead of 1
      targetChildrenArray.splice(
        isSelectedAndTargetComponentsInSameArray
          ? targetComponentIndex
          : targetComponentIndex + 1,
        0,
        selectedComponent
      );
      break;
    case 'beforebegin':
      targetChildrenArray.splice(targetComponentIndex, 0, selectedComponent);
      break;
    default:
      return copySchema;
  }

  return copySchema;
};

export default dragAndDropComponent;
