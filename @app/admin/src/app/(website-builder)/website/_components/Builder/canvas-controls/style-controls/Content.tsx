import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cms/packages/ui/components/Accordion';
import React from 'react';
import controls from './ControlElements';

const Content = () => {
  return (
    <Accordion type="multiple" defaultValue={controls.map((item) => item.key)}>
      {controls.map((data) => (
        <AccordionItem value={data.key} key={data.key}>
          <AccordionTrigger className="bg-secondary px-2">
            <div className="text-left">
              <div className="font-bold text-xs">{data.title}</div>
              <span className="text-xs text-slate-500">
                {data?.description}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pt-2 bg-secondary/50">
            {data.component}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Content;
