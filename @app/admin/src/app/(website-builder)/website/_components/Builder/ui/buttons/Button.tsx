import {
  Button as ButtonElement,
  ButtonProps as ButtonElementProps,
} from '@cms/packages/ui/components/Button';
import { ICON_STYLES } from '@cms/ui/components/Icons';
import React, { ComponentPropsWithRef, FC, forwardRef } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  asChild?: boolean;
  variant?: ButtonElementProps['variant'];
  size?: ButtonElementProps['size'];
  icon?: React.ReactElement | string;
}

const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  return (
    <ButtonElement
      {...props}
      ref={ref}
      size={props.size || 'xs'}
      variant={props.variant || 'default'}
      color="secondary"
    >
      <>
        {props.icon && <span className={ICON_STYLES}>{props.icon}</span>}
        {props.children}
      </>
    </ButtonElement>
  );
});

export default Button;
