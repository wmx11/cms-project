import React from 'react';
import GoBackButton from '../../GoBackButton';
import { Button } from '@nextui-org/button';
import { Publish } from '@cms/ui/components/Icons';
import PublishButton from './PublishButton';

const BuilderHeader = () => {
  return (
    <div className="p-2 border-b-1 border-zinc-200 flex justify-between">
      <div>
        <GoBackButton />
      </div>
      <div>
        <PublishButton />
      </div>
    </div>
  );
};

export default BuilderHeader;
