'use client';
import addComponent from '@cms/template-engine/modules/addComponent';
import builderJss from '@cms/template-engine/styles/builderJss';
import React, { useEffect, useRef } from 'react';
import ComponentsDropdown from '../../../../../components/ComponentsDropdown';
import useBuilderProviderState from '../../../../../hooks/useBuilderProviderState';
import { initHandleDragAndDrop } from './canvas-handlers/canvasDragAndDropHandlers';
import {
  handleCanvasClick,
  handleCanvasContextMenu,
  handleCanvasMouseOver,
  handleCanvasResize,
} from './canvas-handlers/canvasEventsHandlers';
import EditPopover from '../EditPopover';

const BuilderCanvas = () => {
  const state = useBuilderProviderState();

  const {
    schema,
    renderedTemplate,
    templateComponents,
    styles,
    renderTemplate,
    setStyleSheet,
  } = state;

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

  // Initially add the resize handler
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener(
        'resize',
        handleCanvasResize({ canvasOverlayRef, canvasRef })
      );
    }

    const styleSheet = builderJss.createStyleSheet(styles, {
      meta: 'builder-styles',
    });

    setStyleSheet(styleSheet);

    styleSheet.attach();

    renderTemplate();

    return () => {
      window.removeEventListener(
        'resize',
        handleCanvasResize({ canvasOverlayRef, canvasRef })
      );
    };
  }, []);

  // Reinitialize DnD handler whenever the template changes
  useEffect(() => {
    if (typeof window !== undefined) {
      initHandleDragAndDrop({ canvasRef, canvasOverlayRef, state });
    }
  }, [renderedTemplate]);

  // Context menu handler
  const onContextMenu = handleCanvasContextMenu({
    canvasRef,
    canvasOverlayRef,
    state,
  });

  // Mouse over handler for hover effects
  const onMouseOver = handleCanvasMouseOver({ canvasRef, canvasOverlayRef });

  // Click handlers for the canvas highlights and controls
  const onClick = handleCanvasClick({
    canvasRef,
    canvasOverlayRef,
    state,
    handleSelect,
  });

  return (
    <div
      ref={canvasWrapperRef}
      className="bg-zinc-100 min-h-screen px-2 py-12 relative"
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

        <EditPopover />
      </div>
    </div>
  );
};

export default BuilderCanvas;
