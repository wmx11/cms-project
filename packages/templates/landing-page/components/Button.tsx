import { Button as NextButton } from '@nextui-org/button';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = ({
  children,
  className,
}) => {
  return (
    <NextButton color="primary" size="lg">
      {children}
    </NextButton>
  );
};

export default Button;
