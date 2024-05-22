import { Button } from '@cms/ui/components/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

interface ControlsPopoverProps extends PropsWithChildren {
  buttonContent?: React.ReactElement;
  icon?: React.ReactElement;
  style?: CSSProperties;
}

const ControlsPopover: FC<ControlsPopoverProps> = ({
  buttonContent,
  icon,
  style,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="xs" className="border" style={style}>
          {buttonContent ?? icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px]" side="left">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ControlsPopover;
