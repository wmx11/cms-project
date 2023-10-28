import { PATH_SEPARATOR } from '../constants';
import { Schema } from '../types';

/**
 * @description generatePath builds a path to the component in the tree.
 * It will have a structure of index.component. Eg. 0.Section.0.Container.0.Title
 * @param path
 * @param index
 * @param item
 * @returns
 */
const generatePath = (
  path: string | undefined,
  index: number,
  item: Schema
) => {
  const defaultPath = `${index}${PATH_SEPARATOR}${item.component}`;

  if (path) {
    return `${path}${PATH_SEPARATOR}${defaultPath}`;
  }

  return `${index}${PATH_SEPARATOR}${item.component}`;
};

export default generatePath;
