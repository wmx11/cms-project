'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { BREAKPOINT_DEFAULT } from '@cms/packages/template-engine/constants';
import builderJss from '@cms/packages/template-engine/styles/builderJss';
import Kbd from '@cms/packages/ui/components/Kbd';
import { SheetsManager, Styles } from 'jss';
import { useEffect, useRef } from 'react';
import ComponentsListDialog from '../ComponentsListDialog';
import CanvasOverlay from './CanvasOverlay';
import { useEditableContentControls } from './canvas-handlers/canvasComponentsEventsHandlers';
import { initHandleDragAndDrop } from './canvas-handlers/canvasDragAndDropHandlers';
import {
  handleCanvasClick,
  handleCanvasMouseOver,
} from './canvas-handlers/canvasEventsHandlers';
import { useKeyboardEvents } from './canvas-handlers/canvasKeyboardEventsHandlers';

const BuilderCanvas = () => {
  const state = useBuilderProviderState();

  const {
    styles,
    breakpoint,
    renderedTemplate,
    renderTemplate,
    setStyleSheet,
  } = state;

  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightHoverRef = useRef<HTMLDivElement>(null);
  const canvasOverlayLabelRef = useRef<HTMLDivElement>(null);

  // Initialize keyboard event handler
  useKeyboardEvents();
  useEditableContentControls();

  // Initialize styles handler
  useEffect(() => {
    const manager = new SheetsManager();
    const styleSheet = builderJss.createStyleSheet(styles as Partial<Styles>, {
      meta: 'builder-styles',
      link: true,
    });
    const key = {};
    manager.add(key, styleSheet);
    manager.manage(key);
    setStyleSheet(styleSheet);
    renderTemplate();
  }, []);

  // Initialize drag and drop handler
  useEffect(() => {
    if (typeof window !== undefined) {
      initHandleDragAndDrop({ canvasRef, canvasOverlayRef, state });
    }
  }, [renderedTemplate]);

  return (
    <div className="bg-zinc-100 min-h-screen px-3 pb-2 pt-12 mt-[53px] relative flex items-center justify-center">
      <div
        ref={canvasRef}
        data-canvas
        className="bg-white canvas min-h-screen shadow-md relative transition"
        style={{
          width: breakpoint !== BREAKPOINT_DEFAULT ? `${breakpoint}px` : '100%',
          containerType: 'inline-size',
        }}
        onMouseOver={handleCanvasMouseOver({
          canvasRef,
          canvasOverlayLabelRef,
          canvasOverlayHighlightHoverRef,
        })}
        onClick={handleCanvasClick({
          setSelectedComponent: state.setSelectedComponent,
          setSelectedComponentPath: state.setSelectedComponentPath,
          setSelectedElement: state.setSelectedElement,
        })}
      >
        <p className="text-sm text-muted-foreground p-4 absolute top-[-45px]">
          Press <Kbd>⌘</Kbd> + <Kbd>/</Kbd> to add a component...
        </p>

        <CanvasOverlay
          canvasRef={canvasRef}
          canvasOverlayLabelRef={canvasOverlayLabelRef}
          canvasOverlayHighlightHoverRef={canvasOverlayHighlightHoverRef}
        />

        <>{renderedTemplate}</>

        <ComponentsListDialog />
      </div>
    </div>
  );
};

export default BuilderCanvas;
