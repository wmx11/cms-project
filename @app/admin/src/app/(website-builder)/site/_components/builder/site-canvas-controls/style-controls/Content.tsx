'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cms/packages/ui/components/Accordion';
import React from 'react';
import controls from './ControlElements';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';

const Content = () => {
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  // const _controls = (() => {
  //   switch (selectedComponent?.component) {
  //     case 'Image':
  //       return controls.filter((item) => item.key === 'image');
  //     default:
  //       return controls;
  //   }
  // })();

  return (
    <Accordion type="multiple" defaultValue={controls.map((item) => item.key)}>
      {controls.map((data) => (
        <AccordionItem value={data.key} key={data.key}>
          <AccordionTrigger className="bg-secondary px-2">
            <div className="text-left">
              <div className="text-xs font-bold">{data.title}</div>
              <span className="text-xs text-slate-500">
                {data?.description}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-secondary/50 px-2 pt-2">
            {data.component}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Content;
