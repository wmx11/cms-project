import { Schema } from '@cms/tiglee-engine/types';
import {
  AccordionContent,
  AccordionItem as AccordionItemPrimitive,
  AccordionTrigger,
} from '@cms/packages/ui/components/Accordion';
import { ComponentPropsWithoutRef, FC } from 'react';
import slugify from 'slugify';
import { schema as TextSchema } from './Text';

interface Props
  extends ComponentPropsWithoutRef<typeof AccordionItemPrimitive> {
  trigger: string;
  content: string;
}

const AccordionItem: FC<Props> = ({
  value,
  trigger,
  content,
  children,
  ...props
}) => {
  return (
    <AccordionItemPrimitive value={slugify(trigger)} {...props}>
      <AccordionTrigger>
        <div data-trigger>{trigger}</div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItemPrimitive>
  );
};

export default AccordionItem;

export const schema: Schema = {
  component: 'AccordionItem',
  category: 'block',
  displayName: 'Accordion item',
  description: 'Reveal a section of content.',
  props: [
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'trigger',
      type: 'string',
      displayName: 'Label',
      description: 'Content that will be clicked to reveal more content',
      value: 'Accordion Label',
    },
    {
      name: 'children',
      type: 'component',
      displayName: 'Accordion item content',
      description: 'Content that will be revealed',
      value: [TextSchema],
    },
  ],
};
