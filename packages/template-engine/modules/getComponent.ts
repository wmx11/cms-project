import { Schema } from '../types';

type GetComponentProps = {
  schema: Schema[];
  path: string;
};

/**
 * 
 * @deprecated
*/
const getComponent = (props: GetComponentProps) => {
  if (!props.path) {
    return null;
  }
};

export default getComponent;
