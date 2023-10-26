'use client';
import { handleAddRemoveComponent } from '@cms/template-engine/parseSchema';
import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import useGlobalStore from '../../../store/useGlobalStore';
import {
  handleCanvasClick,
  handleCanvasContextMenu,
  handleCanvasMouseOver,
  handleCanvasResize,
} from '../../Builder/Canvas/canvasEventsHandlers';
import ComponentsDropdown from '../../ComponentsDropdown';
import EditPopover from '../../EditPopover';

type Props = {
  draftSchema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const BuilderCanvas = ({
  draftSchema,
  templateId,
  templateComponents,
}: Props) => {
  const {
    schema,
    setSchema,
    renderedTemplate,
    renderTemplate,
    templateId: templateIdGlobal,
    setTemplateId,
  } = useGlobalStore();

  const [isOpen, setIsOpen] = useState(false);

  const [triggerRef, setTriggerRef] = useState<RefObject<HTMLElement>>({
    current: null,
  });
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasOverlayRef = useRef<HTMLDivElement>(null);

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
      schema,
      path,
    });

    setSchema(updatedSchema);
    renderTemplate();
  };

  useEffect(() => {
    if (!templateIdGlobal) {
      setSchema(draftSchema);
      setTemplateId(templateId);
    }

    if (typeof window !== undefined) {
      renderTemplate();

      window.addEventListener(
        'resize',
        handleCanvasResize({ canvasOverlayRef, canvasRef })
      );
    }

    return () => {
      window.removeEventListener(
        'resize',
        handleCanvasResize({ canvasOverlayRef, canvasRef })
      );
    };
  }, [isOpen]);

  return (
    <div
      ref={canvasWrapperRef}
      className="bg-zinc-100 min-h-screen max-h-screen px-4 py-12 overflow-auto relative"
    >
      <div
        ref={canvasRef}
        data-canvas
        className="bg-white canvas min-h-screen shadow-md relative"
        onContextMenu={handleCanvasContextMenu({
          canvasRef,
          canvasOverlayRef,
          setIsOpen,
          setTriggerRef,
        })}
        onMouseOver={handleCanvasMouseOver({ canvasRef, canvasOverlayRef })}
        onClick={handleCanvasClick({
          canvasRef,
          canvasOverlayRef,
          templateComponents,
          handleSelect,
          setIsOpen,
          setTriggerRef,
        })}
      >
        <div
          ref={canvasOverlayRef}
          data-canvas-overlay
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
