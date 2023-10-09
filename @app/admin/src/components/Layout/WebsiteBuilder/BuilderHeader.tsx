import React from 'react';
import GoBackButton from '../../GoBackButton';

const BuilderHeader = () => {
  return (
    <div className="p-2 border-b-1 border-zinc-200 flex justify-between">
      <div>
        <GoBackButton />
      </div>
      <div></div>
    </div>
  );
};

export default BuilderHeader;
