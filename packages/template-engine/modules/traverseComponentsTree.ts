import { Schema } from '../types';
import getPathArray, { checkTopLevel } from './getPathArray';

const getIndexType = (index: string) => {
  const parsedIndex = parseInt(index, 10);
  const isIndexNumber = !isNaN(parsedIndex);
  const isIndexString = isNaN(parsedIndex);

  return {
    index: isIndexNumber ? (parsedIndex as number) : (index as string),
    isIndexNumber,
    isIndexString,
  };
};

const getParentPath = (path: string) => {
  const pathArray = getPathArray(path);
  const isTopLevel = checkTopLevel(pathArray);
  const parentPath = isTopLevel ? pathArray : pathArray.slice(0, -2);
  return parentPath;
};

interface TraverseComponentsTreeProps {
  schema: Schema[];
  path: string;
  returnParent?: boolean;
}

const traverseComponentsTree = (
  props: TraverseComponentsTreeProps
): Schema | null => {
  if (!props.path) {
    return null;
  }

  if (!props.schema) {
    return null;
  }

  const { path, returnParent, schema } = props;

  const pathArray = returnParent ? getParentPath(path) : getPathArray(path);

  const traverse = (
    schemaArray: Schema[] | Schema,
    iteration = 0
  ): Schema | Schema[] => {
    let _schema = schemaArray;
    let _iteration = iteration;
    const { index, isIndexNumber, isIndexString } = getIndexType(
      pathArray[_iteration]
    );

    if (_iteration + 1 > pathArray.length) {
      return _schema;
    }

    if (isIndexNumber && Array.isArray(_schema)) {
      const newSchema = _schema[index as number];
      _iteration += 1;
      return traverse(newSchema, _iteration);
    }

    if (
      isIndexString &&
      !Array.isArray(_schema) &&
      _schema.component === index &&
      _iteration + 1 < pathArray.length
    ) {
      const newSchema = _schema.props.find((item) => item.type === 'component');
      _iteration += 1;
      return traverse(newSchema?.value as Schema[], _iteration);
    }

    if (
      !Array.isArray(_schema) &&
      _schema.component === index &&
      _iteration + 1 === pathArray.length
    ) {
      return _schema;
    }

    return _schema;
  };

  return traverse(schema) as Schema;
};

export default traverseComponentsTree;
