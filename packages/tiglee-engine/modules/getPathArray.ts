import { PATH_SEPARATOR } from '../constants';

const getPathArray = (path: string) => path.split(PATH_SEPARATOR);

/**
 * @description - checks if the given pathArray returns a top level element. Top level elements will have pathArray length of 2. Eg. [2, Section]
 * @param pathArray
 * @returns
 */
export const checkTopLevel = (pathArray: string[]) => pathArray.length === 2;

export const getIndexFromPathArray = (
  pathArray: string[],
  position: number
) => {
  const index = parseInt(pathArray.at(position) as string, 10);

  if (isNaN(index)) {
    return null;
  }

  return index;
};

export default getPathArray;
