import { Button } from '@cms/ui/components/Button';
import { ElipsisIcon, ICON_STYLES } from '@cms/ui/components/Icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import React from 'react';
import DynamicComponentControls from '../../ui/dynamic-component-controls/DynamicComponentControls';

const AdditionalSettingsButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs">
          <ElipsisIcon className={`${ICON_STYLES}`} />
          <span>Edit</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <DynamicComponentControls />
      </PopoverContent>
    </Popover>
  );
};

export default AdditionalSettingsButton;
