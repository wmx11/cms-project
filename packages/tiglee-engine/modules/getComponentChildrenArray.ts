import { Schema } from '../types';

export const getComponentChildrenArray = (component: Schema) => {
  return component.props.find(
    (item) => item.type === 'component' && item.name === 'children'
  )?.value as Schema[];
};
