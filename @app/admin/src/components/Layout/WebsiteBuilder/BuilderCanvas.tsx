'use client';
import addComponent from '@cms/template-engine/modules/addComponent';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import useBuilderProviderState from '../../../hooks/useBuilderProviderState';
import {
  handleCanvasClick,
  handleCanvasContextMenu,
  handleCanvasMouseOver,
  handleCanvasResize,
} from '../../Builder/Canvas/canvasEventsHandlers';
import ComponentsDropdown from '../../ComponentsDropdown';
import EditPopover from '../../EditPopover';
import { initHandleDragAndDrop } from '../../Builder/Canvas/canvasDragAndDropHandlers';

const BuilderCanvas = () => {
  const state = useBuilderProviderState();

  const { schema, renderedTemplate, templateComponents, renderTemplate } =
    state;

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

    const updatedSchema = addComponent({ componentSchema, schema, path });

    if (!updatedSchema) {
      return null;
    }

    renderTemplate(updatedSchema);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
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

  useEffect(() => {
    if (typeof window !== undefined && schema.length > 0) {
      console.log('schema updated');

      setTimeout(() => {
        initHandleDragAndDrop({ canvasRef, canvasOverlayRef, state });
      }, 500);
    }
  }, [schema]);

  // Context menu handler
  const onContextMenu = handleCanvasContextMenu({
    canvasRef,
    canvasOverlayRef,
    setIsOpen,
    setTriggerRef,
  });

  // Mouse over handler for hover effects
  const onMouseOver = handleCanvasMouseOver({ canvasRef, canvasOverlayRef });

  // Click handlers for the canvas highlights and controls
  const onClick = handleCanvasClick({
    canvasRef,
    canvasOverlayRef,
    state,
    handleSelect,
    setIsOpen,
    setTriggerRef,
  });

  return (
    <div
      ref={canvasWrapperRef}
      className="bg-zinc-100 min-h-screen max-h-screen px-2 py-12 overflow-auto relative"
    >
      <div
        ref={canvasRef}
        data-canvas
        className="bg-white canvas min-h-screen shadow-md relative"
        onContextMenu={onContextMenu}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <div
          ref={canvasOverlayRef}
          data-canvas-overlay
          className="canvas-overlay absolute inset-0"
        ></div>

        <>{renderedTemplate}</>

        {renderedTemplate.length < 1 && (
          <ComponentsDropdown
            templateComponents={templateComponents}
            onSelect={handleSelect}
            isCompact
          />
        )}

        <EditPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triggerRef={triggerRef}
          setTriggerRef={setTriggerRef}
        />
      </div>
    </div>
  );
};

export default BuilderCanvas;
