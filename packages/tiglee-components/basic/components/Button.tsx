import { Schema } from '@cms/packages/tiglee-engine/types';
import {
  Button as ButtonComponent,
  ButtonProps,
} from '@cms/packages/ui/components/Button';
import { FC } from 'react';

const Button: FC<ButtonProps> = (props) => {
  return (
    <ButtonComponent {...props}>
      <span>{props.children}</span>
    </ButtonComponent>
  );
};

export default Button;

export const schema: Schema = {
  component: 'Button',
  category: 'button',
  editable: true,
  description:
    'Use Button components to link to other pages or add a call to action',
  displayName: 'Button',
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
