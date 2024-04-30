'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  BREAKPOINT_DEFAULT,
  BREAKPOINT_DEFAULT_WIDTH,
  BUILDER_STYLES_META_TAG,
} from '@cms/packages/tiglee-engine/constants';
import builderJss from '@cms/packages/tiglee-engine/styles/builderJss';
import Kbd from '@cms/packages/ui/components/Kbd';
import { SheetsManager, Styles } from 'jss';
import { useEffect, useRef } from 'react';
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

  const isStyleSheetSet = useRef(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasBackgroundRef = useRef<HTMLDivElement>(null);
  // const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightHoverRef = useRef<HTMLDivElement>(null);
  const canvasOverlayLabelRef = useRef<HTMLDivElement>(null);

  // Initialize keyboard event handler
  useKeyboardEvents({ canvasWrapperRef, canvasRef, canvasBackgroundRef });
  useEditableContentControls();

  // Initialize styles handler
  useEffect(() => {
    if (isStyleSheetSet.current) {
      return;
    }
    const manager = new SheetsManager();
    const styleSheet = builderJss.createStyleSheet(styles as Partial<Styles>, {
      meta: BUILDER_STYLES_META_TAG,
      link: true,
    });
    const key = {};
    manager.add(key, styleSheet);
    manager.manage(key);
    setStyleSheet(styleSheet);
    renderTemplate();
    isStyleSheetSet.current = true;
  }, []);

  // Initialize drag and drop handler
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     initHandleDragAndDrop({ canvasRef, canvasOverlayRef, state });
  //   }
  // }, [renderedTemplate]);

  return (
    <div
      className={`relative mt-[47px] flex min-h-screen items-center justify-center overflow-clip bg-zinc-100 px-3 pb-2 pt-12`}
      ref={canvasBackgroundRef}
    >
      <div
        className="flex transition-[scale] duration-100 ease-out"
        data-x="0"
        data-y="0"
        style={{ transformOrigin: 'calc(50% - 220px) 50%', scale: canvasScale }}
        ref={canvasWrapperRef}
      >
        <div
          data-tg-theme-type="light"
          data-tg-theme-name
          data-canvas
          ref={canvasRef}
          className="canvas tg-wrapper relative min-h-screen shadow-md transition-[width,color,background-color,background] duration-100 ease-out"
          style={{
            width:
              breakpoint !== BREAKPOINT_DEFAULT
                ? `${breakpoint}px`
                : `${BREAKPOINT_DEFAULT_WIDTH}px`,
            containerType: 'inline-size',
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
            resetSelection: useBuilderProviderState(
              (state) => state.resetSelection
            ),
          })}
        >
          <p className="text-muted-foreground absolute top-[-47px] p-4 text-sm">
            Press <Kbd>⌘</Kbd> + <Kbd>/</Kbd> to add a component...
          </p>

          <CanvasOverlay
            canvasRef={canvasRef}
            canvasOverlayLabelRef={canvasOverlayLabelRef}
            canvasOverlayHighlightHoverRef={canvasOverlayHighlightHoverRef}
          />

          <>{renderedTemplate}</>
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;
