import React, { FC, PropsWithChildren } from 'react';

const ControlsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex [&>*]:max-w-[calc(50%-8px)] [&>*]:w-full flex-wrap justify-between items-end gap-2">
      {children}
    </div>
  );
};

export default ControlsWrapper;
