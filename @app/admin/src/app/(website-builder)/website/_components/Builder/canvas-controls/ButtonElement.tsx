import { Button, ButtonVariantProps } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

type ButtonElementProps = {
  variant?: ButtonVariantProps['variant'];
  icon?: React.ReactElement | string;
  onClick?: () => void;
} & PropsWithChildren;

const ButtonElement = (props: ButtonElementProps) => {
  return (
    <Button
      size="sm"
      variant={props.variant || 'light'}
      color="secondary"
      radius="none"
      startContent={props.icon}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default ButtonElement;
