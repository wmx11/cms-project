import { Schema } from '@cms/tiglee-engine/types';
import { Accordion as AccordionPrimitive } from '@cms/packages/ui/components/Accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import { FC } from 'react';
import { schema as AccordionItemSchema } from './AccordionItem';

export interface Props extends AccordionSingleProps {}

const Accordion: FC<Props> = ({ ...props }) => {
  return (
    <AccordionPrimitive
      {...props}
      type="single"
      collapsible
    ></AccordionPrimitive>
  );
};

export default Accordion;

export const schema: Schema = {
  component: 'Accordion',
  category: 'block',
  description: 'Reveal a section of content.',
  props: [
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'children',
      type: 'component',
      allowedComponents: ['AccordionItem'],
      value: [AccordionItemSchema],
    },
  ],
};
