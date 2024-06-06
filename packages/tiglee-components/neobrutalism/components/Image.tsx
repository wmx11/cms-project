import { ComponentPropsWithoutRef, FC } from 'react';
import Client_Image from '../client-components/Image';

const Image: FC<ComponentPropsWithoutRef<'img'>> = (props) => {
  return <Client_Image {...props} />;
};

export default Image;

export { schema } from '@cms/packages/tiglee-components/basic/components/Image';
