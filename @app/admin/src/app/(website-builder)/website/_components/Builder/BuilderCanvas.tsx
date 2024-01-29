'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  BREAKPOINT_DEFAULT,
  BREAKPOINT_DEFAULT_WIDTH,
} from '@cms/packages/template-engine/constants';
import builderJss from '@cms/packages/template-engine/styles/builderJss';
import Kbd from '@cms/packages/ui/components/Kbd';
import { SheetsManager, Styles } from 'jss';
import { useEffect, useRef } from 'react';
import ComponentsListDialog from '../ComponentsListDialog';
import CanvasOverlay from './CanvasOverlay';
import { useEditableContentControls } from './canvas-handlers/canvasComponentsEventsHandlers';
import { initHandleDragAndDrop } from './canvas-handlers/canvasDragAndDropHandlers';
import { handleCanvasClick } from './canvas-handlers/canvasEventsHandlers';
import { useKeyboardEvents } from './canvas-handlers/canvasKeyboardEventsHandlers';

const BuilderCanvas = () => {
  const styles = useBuilderProviderState((state) => state.styles);
  const breakpoint = useBuilderProviderState((state) => state.breakpoint);
  const renderedTemplate = useBuilderProviderState(
    (state) => state.renderedTemplate
  );
  const canvasScale = useBuilderProviderState((state) => state.canvasScale);
  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );
  const setStyleSheet = useBuilderProviderState((state) => state.setStyleSheet);

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
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     initHandleDragAndDrop({ canvasRef, canvasOverlayRef, state });
  //   }
  // }, [renderedTemplate]);

  return (
    <div
      className={`bg-zinc-100 min-h-screen px-3 pb-2 pt-12 mt-[47px] relative flex items-center justify-center`}
    >
      <div
        data-canvas
        ref={canvasRef}
        className="bg-white canvas min-h-screen shadow-md relative transition"
        style={{
          width:
            breakpoint !== BREAKPOINT_DEFAULT
              ? `${breakpoint}px`
              : `${BREAKPOINT_DEFAULT_WIDTH}px`,
          containerType: 'inline-size',
          transformOrigin: 'top center',
          scale: canvasScale,
        }}
        onClick={handleCanvasClick({
          setSelectedComponent: useBuilderProviderState(
            (state) => state.setSelectedComponent
          ),
          setSelectedComponentPath: useBuilderProviderState(
            (state) => state.setSelectedComponentPath
          ),
          setSelectedElement: useBuilderProviderState(
            (state) => state.setSelectedElement
          ),
        })}
      >
        <p className="text-sm text-muted-foreground p-4 absolute top-[-47px]">
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
