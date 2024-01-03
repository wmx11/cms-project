'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { BREAKPOINT_XS } from '@cms/packages/template-engine/constants';
import addComponent from '@cms/packages/template-engine/modules/addComponent';
import builderJss from '@cms/packages/template-engine/styles/builderJss';
import { SheetsManager } from 'jss';
import React, { useEffect, useRef } from 'react';
import ComponentsListDialog from '../ComponentsListDialog';
import { initHandleDragAndDrop } from './canvas-handlers/canvasDragAndDropHandlers';
import {
  handleCanvasClick,
  handleCanvasContextMenu,
  handleCanvasMouseOver,
  handleCanvasResize,
} from './canvas-handlers/canvasEventsHandlers';

import Kbd from '@cms/packages/ui/components/Kbd';

const BuilderCanvas = () => {
  const state = useBuilderProviderState();

  const {
    schema,
    styles,
    breakpoint,
    renderedTemplate,
    templateComponents,
    selectedComonentPath,
    setIsOpen,
    setStyleElement,
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

    const updatedSchema = addComponent({
      componentSchema,
      schema,
      path,
    });

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

    const manager = new SheetsManager();

    const styleSheet = builderJss.createStyleSheet(styles, {
      meta: 'builder-styles',
      link: true,
    });

    const key = {};

    manager.add(key, styleSheet);
    manager.manage(key);

    setStyleSheet(styleSheet);

    const styleElement = document.querySelector('[data-meta="builder-styles"]');

    if (styleElement) {
      setStyleElement(styleElement);
      styleElement.innerHTML = styleSheet.toString();
    }

    renderTemplate();

    return () => {
      window.removeEventListener(
        'resize',
        handleCanvasResize({ canvasOverlayRef, canvasRef })
      );
    };
  }, []);

  // Command handlers
  useEffect(() => {
    const handleCommandKey = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        setIsOpen(true);
        return;
      }
    };

    document.addEventListener('keydown', handleCommandKey);
    return () => document.removeEventListener('keydown', handleCommandKey);
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
      className="bg-zinc-100 min-h-screen px-3 py-12 mt-[calc(49*2px)] relative flex items-center justify-center"
    >
      <div
        ref={canvasRef}
        data-canvas
        className="bg-white canvas min-h-screen shadow-md relative transition-width"
        style={{
          width: breakpoint !== BREAKPOINT_XS ? `${breakpoint}px` : '100%',
          containerType: 'inline-size',
        }}
        onContextMenu={onContextMenu}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <p className="text-sm text-muted-foreground p-4 absolute top-[-45px]">
          Press <Kbd>CTRL</Kbd> + <Kbd>/</Kbd> to add a component...
        </p>

        <div
          ref={canvasOverlayRef}
          data-canvas-overlay
          className="canvas-overlay absolute inset-0"
        ></div>

        <>{renderedTemplate}</>

        <ComponentsListDialog />
      </div>
    </div>
  );
};

export default BuilderCanvas;
