import { Schema } from '@cms/packages/tiglee-engine/types';
import { ComponentPropsWithoutRef, FC } from 'react';
import ImageComponent from '../client-components/Image';

const Image: FC<ComponentPropsWithoutRef<'img'>> = (props) => {
  return <ImageComponent {...props} />;
};

export default Image;

export const schema: Schema = {
  component: 'Image',
  category: 'image',
  description: 'Upload an image.',
  displayName: 'Image',
  props: [
    {
      name: 'src',
      type: 'string',
      value: 'https://pub-74bba6d2bc6a4e40bd05762f56bd8a1b.r2.dev/no-image.png',
      displayName: 'Image source',
    },
    {
      name: 'alt',
      type: 'string',
      value: 'Image alternative tag',
      displayName: 'Image alt tag',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'width',
      type: 'string',
      value: '100px',
    },
    {
      name: 'height',
      type: 'string',
      value: '100px',
    },
  ],
};
