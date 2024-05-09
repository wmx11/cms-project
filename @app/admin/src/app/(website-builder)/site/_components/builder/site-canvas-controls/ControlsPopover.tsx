import { Button } from '@cms/ui/components/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

interface ControlsPopoverProps extends PropsWithChildren {
  icon: React.ReactElement;
  style?: CSSProperties;
}

const ControlsPopover: FC<ControlsPopoverProps> = ({
  icon,
  style,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="xs" className="border" style={style}>
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px]" side="left">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ControlsPopover;
