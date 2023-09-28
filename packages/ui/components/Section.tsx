import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

const Section: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={`${className} py-24`} style={style}>
      {children}
    </div>
  );
};

export default Section;
