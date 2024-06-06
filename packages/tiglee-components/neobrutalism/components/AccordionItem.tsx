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
    <AccordionItemPrimitive
      value={slugify(trigger)}
      {...props}
      className="rounded-base shadow-base border-2 border-b border-black"
    >
      <AccordionTrigger className="rounded-b-base rounded-t-base bg-tg-primary flex flex-1 items-center justify-between border-black p-4 font-bold transition-all [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-2">
        <div data-trigger>{trigger}</div>
      </AccordionTrigger>
      <AccordionContent className="p-2 rounded-b-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-tg-primary-foreground overflow-hidden bg-white text-sm transition-all">
        {children}
      </AccordionContent>
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
