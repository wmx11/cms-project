import { Schema } from '@cms/tiglee-engine/types';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardPrimitive,
  CardTitle,
} from '@cms/packages/ui/components/Card';
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

const Card: FC<Props> = ({
  className,
  children,
  description,
  footer,
  title,
  ...props
}) => {
  return (
    <div {...props} data-component-parent>
      <CardPrimitive className={className}>
        <CardHeader data-header>
          <CardTitle data-title>{title}</CardTitle>
          <CardDescription data-description>{description}</CardDescription>
        </CardHeader>
        <CardContent data-children>{children}</CardContent>
        <CardFooter data-footer>{footer}</CardFooter>
      </CardPrimitive>
    </div>
  );
};

export default Card;

export const schema: Schema = {
  component: 'Card',
  category: 'block',
  displayName: 'Card',
  description: 'Put things into a card',
  props: [
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'title',
      type: 'string',
      displayName: 'Card title',
      value: '',
    },
    {
      name: 'description',
      displayName: 'Card description',
      type: 'string',
      value: '',
    },
    {
      name: 'children',
      type: 'component',
      value: [],
    },
    {
      name: 'footer',
      displayName: 'Footer components',
      type: 'component',
      value: [],
    },
  ],
};
