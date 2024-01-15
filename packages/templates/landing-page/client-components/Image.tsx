import { FC, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Image: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return (
    <img
      {...props}
      alt="alt stuff"
      className={twMerge('mb-2', props.className)}
      width={props.width}
      height={props.height}
    />
  );
};

export default Image;
