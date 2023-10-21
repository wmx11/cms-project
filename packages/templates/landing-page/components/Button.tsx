import { Schema } from '@cms/template-engine/types';
import { Button as NextButton } from '@nextui-org/button';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = ({
  children,
  className,
  id,
}) => {
  return (
    <NextButton
      id={id}
      className={className}
      data-label="Button"
      color="primary"
      size="lg"
    >
      {children}
    </NextButton>
  );
};

export default Button;

export const schema: Schema = {
  component: 'Button',
  category: 'button',
  description:
    'Use Button components to link to other pages or add a call to action',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Button',
      displayName: 'Button text',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
      displayName: 'Button classes',
      description: 'You can use Tailwind classes to style this button',
    },
  ],
};
