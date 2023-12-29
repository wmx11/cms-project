import { Schema } from '@cms/packages/template-engine/types';
import { Image as NextImage } from '@nextui-org/image';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  src: string;
  width?: number;
  height?: number;
} & HTMLAttributes<HTMLImageElement>;

const Image = ({ src, width, height, className, id }: Props) => {
  return (
    <NextImage
      id={id}
      className={twMerge('mb-2', className)}
      src={src}
      width={500}
      height={500}
    />
  );
};

export default Image;

export const schema: Schema = {
  component: 'Image',
  category: 'layout',
  description:
    'Use Button components to link to other pages or add a call to action',
  props: [
    {
      name: 'src',
      type: 'string',
      value: 'https://nextui.org/images/hero-card-complete.jpeg',
      displayName: 'Image source',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Button classes',
      description: 'You can use Tailwind classes to style this button',
    },
    {
      name: 'width',
      type: 'string',
      value: '100px',
      displayName: 'Width of the image',
      description: 'You can use Tailwind classes to style this button',
    },
    {
      name: 'height',
      type: 'string',
      value: '100px',
      displayName: 'Height of the image',
      description: 'You can use Tailwind classes to style this button',
    },
  ],
};
