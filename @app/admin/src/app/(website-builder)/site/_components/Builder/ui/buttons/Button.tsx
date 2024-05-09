import {
  Button as ButtonElement,
  ButtonProps as ButtonElementProps,
  ButtonProps,
} from '@cms/packages/ui/components/Button';
import { ICON_STYLES } from '@cms/ui/components/Icons';
import React, {
  ComponentPropsWithoutRef,
  FC,
  forwardRef
} from 'react';

interface Props extends ComponentPropsWithoutRef<'button'>, ButtonProps {
  asChild?: boolean;
  variant?: ButtonElementProps['variant'];
  size?: ButtonElementProps['size'];
  icon?: React.ReactElement | string;
}

const Button: FC<Props> = forwardRef((props, ref) => {
  return (
    <ButtonElement
      {...props}
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
