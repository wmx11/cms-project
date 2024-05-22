import { Schema } from '@cms/packages/tiglee-engine/types';
import { Separator as SeparatorComponent } from '@cms/packages/ui/components/Separator';
import { ComponentPropsWithoutRef, FC } from 'react';

const Separator: FC<ComponentPropsWithoutRef<typeof SeparatorComponent>> = ({
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <SeparatorComponent
      className={className}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
};

export default Separator;

export const schema: Schema = {
  component: 'Separator',
  category: 'layout',
  description: 'Visually separate content.',
  displayName: 'Separator',
  props: [
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'orientation',
      type: 'select',
      value: 'horizontal',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
      displayName: 'Orientation of separator',
    },
    {
      name: 'decorative',
      type: 'boolean',
      value: true,
      displayName: 'Is decorative?',
      description:
        'When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.',
    },
  ],
};
