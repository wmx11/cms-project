import { FC, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Image: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return (
    <img
      {...props}
      alt={props.alt}
      className={twMerge(props.className)}
      width={props.width}
      height={props.height}
      loading="lazy"
    />
  );
};

export default Image;
