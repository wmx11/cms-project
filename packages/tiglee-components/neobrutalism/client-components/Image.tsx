import { FC, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Image: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return (
    <img
      {...props}
      alt={props.alt}
      className={twMerge(
        '!rounded-base !shadow-base border-2 border-black overflow-clip',
        props.className
      )}
      width={props.width}
      height={props.height}
      loading="lazy"
    />
  );
};

export default Image;
