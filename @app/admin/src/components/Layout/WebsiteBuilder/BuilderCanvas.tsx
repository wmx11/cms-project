'use client';
import parseSchema, {
  handleAddRemoveComponent,
} from '@cms/template-engine/parseSchema';
import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  getDataSchema,
  setDataSchema,
} from '../../../utils/builder-tools/getDataSchema';
import ComponentsDropdown from '../../ComponentsDropdown';
import EditPopover from '../../EditPopover';

type Props = {
  schema?: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const BuilderCanvas = ({ schema, templateId, templateComponents }: Props) => {
  const [renderedTemplate, setRenderedTemplate] = useState<Schema[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const canvasOverlayRef = useRef<HTMLDivElement>(null);

  const [triggerRef, setTriggerRef] = useState<RefObject<HTMLElement>>({
    current: null,
  });

  const handleSelect = async (componentId: React.Key, path: string) => {
    const selectedComponent = templateComponents.find(
      (item) => item.id === componentId
    );

    if (!selectedComponent || !selectedComponent?.schema) {
      return;
    }

    const componentSchema = JSON.parse(
      (selectedComponent?.schema as string) || '[]'
    );

    const updatedSchema = handleAddRemoveComponent({
      component: componentSchema,
      schema: getDataSchema(),
      path,
    });

    setDataSchema(updatedSchema);

    const renderedTemplate = await parseSchema({
      schema: updatedSchema,
      templateId: templateId,
      componentsArray: [],
      isBuilder: true,
      componentsDropdown: (
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={(key, componentPath) => handleSelect(key, componentPath)}
          isBuilder
        />
      ),
    });

    setRenderedTemplate(renderedTemplate);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      parseSchema({
        schema: getDataSchema(),
        templateId: templateId,
        componentsArray: [],
        isBuilder: true,
        componentsDropdown: (
          <ComponentsDropdown
            templateComponents={templateComponents}
            onSelect={(key, componentPath) => handleSelect(key, componentPath)}
            isBuilder
          />
        ),
      }).then((renderedTemplate) => {
        setRenderedTemplate(renderedTemplate);
      });

      // initCanvasControls({
      //   templateComponents,
      //   setTriggerRef,
      //   handleSelect,
      //   setIsOpen,
      // });
    }
  }, [isOpen]);

  return (
    <div className="bg-zinc-100 min-h-screen max-h-screen px-4 py-6 overflow-auto relative">
      <div
        ref={canvasRef}
        className="bg-white canvas min-h-screen shadow-md relative before:content-[''] before:absolute before:inset-[-16px]"
        onClick={(e) => {
          console.log(e);
        }}
      >
        <div
          ref={canvasOverlayRef}
          className="canvas-overlay absolute inset-0"
        ></div>
        <>{renderedTemplate}</>
        <EditPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triggerRef={triggerRef}
          setTriggerRef={setTriggerRef}
        />
      </div>
      <div className="p-4 border border-dashed border-blue-300 text-center hover:border-blue-500 transition-colors bg-white">
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default BuilderCanvas;
