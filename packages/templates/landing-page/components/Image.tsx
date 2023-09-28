import { Image as NextImage } from '@nextui-org/image';
import { HTMLAttributes } from 'react';

type Props = {
  src: string;
  width?: number;
  height?: number;
} & HTMLAttributes<HTMLImageElement>;

const Image = ({ src, width, height, className }: Props) => {
  return (
    <NextImage className={className} src={src} width={width} height={height} />
  );
};

export default Image;
