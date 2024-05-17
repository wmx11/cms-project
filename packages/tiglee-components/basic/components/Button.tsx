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
  description: 'Link to other pages or call to action.',
  displayName: 'Button',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Button',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
  ],
};
