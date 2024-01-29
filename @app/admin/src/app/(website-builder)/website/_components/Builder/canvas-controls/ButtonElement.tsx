import { Button, ButtonProps } from '@cms/packages/ui/components/Button';
import React, { FC, HTMLProps, PropsWithChildren } from 'react';

interface ButtonElementProps extends PropsWithChildren {
  className?: string;
  asChild?: boolean;
  variant?: ButtonProps['variant'];
  icon?: React.ReactElement | string;
  onClick?: () => void;
}

const ButtonElement: FC<ButtonElementProps> = (props) => {
  return (
    <Button
      {...props}
      size="xs"
      variant={props.variant || 'default'}
      color="secondary"
      onClick={props.onClick}
    >
      <>
        {props.icon && <span className="h-3 w-3 mr-2">{props.icon}</span>}
        {props.children}
      </>
    </Button>
  );
};

export default ButtonElement;
