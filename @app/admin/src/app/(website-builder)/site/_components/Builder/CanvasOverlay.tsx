'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_CANVAS,
  DATA_COMPONENT,
  DATA_DISPLAY_NAME,
  DATA_LABEL
} from '@cms/packages/tiglee-engine/constants';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import DeleteElementButton from './canvas-controls/element-overlay-controls/DeleteElementButton';
import DuplicateElementButton from './canvas-controls/element-overlay-controls/DuplicateElementButton';
import ElementInfoButton from './canvas-controls/element-overlay-controls/ElementInfoButton';

export interface CanvasOverlayProps {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
  canvasOverlayHighlightHoverRef: RefObject<HTMLDivElement>;
  canvasOverlayLabelRef: RefObject<HTMLDivElement>;
}

const CanvasOverlay: FC<CanvasOverlayProps> = (props) => {
  const {
    canvasRef: { current: canvas },
    canvasOverlayRef,
  } = props;

  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );
  const renderedTemplate = useBuilderProviderState(
    (state) => state.renderedTemplate
  );
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const initialized = useBuilderProviderState((state) => state.initialized);
  const canvasScale = useBuilderProviderState((state) => state.canvasScale);
  const showGrid = useBuilderProviderState((state) => state.showGrid);
  const styles = useBuilderProviderState((state) => state.styles);
  const canvasOverlayControlsRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<JSX.Element[] | null>(null);
  const [transitioned, setTransitioned] = useState(new Date().getTime());
  const toggleGrid = useBuilderProviderState((state) => state.toggleGrid);

  const scale = 1 / canvasScale || 1;

  /**
   * Toggle grid when everything has been initialized to avoid messed up grid displays.
   */
  useEffect(() => {
    if (!initialized) {
      return;
    }

    const handleTransitionEnd = (e: TransitionEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute(DATA_CANVAS)) {
        setTransitioned(new Date().getTime());
      }
    };

    toggleGrid(true);

    canvas?.addEventListener('transitionend', handleTransitionEnd, true);
    return () => {
      canvas?.removeEventListener('transitionend', handleTransitionEnd, true);
    };
  }, [initialized]);

  /**
   * This handles the overlay highlight grid when an element is selected.
   */
  useEffect(() => {
    if (!canvasOverlayHighlightRef.current || !canvas || !selectedElement) {
      return;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    const { height, width, top, left } =
      selectedElement?.getBoundingClientRect();

    const _height = height * scale;
    const _width = width * scale;
    const _top = (top - canvasY) * scale;
    const _left = (left - canvasX) * scale;

    Object.assign(canvasOverlayHighlightRef.current.style, {
      height: `${_height}px`,
      width: `${_width}px`,
      top: `${_top}px`,
      left: `${_left}px`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedTemplate, selectedElement, showGrid, styles, transitioned]);

  /**
   * This handles the overall grid display for each individual item on the canvas.
   */
  useEffect(() => {
    if (!canvas) {
      return;
    }

    if (!showGrid) {
      setGrid(null);
      return;
    }

    const components = document.querySelectorAll(`[${DATA_COMPONENT}]`);

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    const gridElements = [...components]?.map((item, index) => {
      const { height, width, top, left } = item?.getBoundingClientRect();

      return (
        <div
          key={`canvas_overlay_grid_${index}`}
          data-target-id={item.id}
          data-canvas-overlay-highlight="hover"
          className="group pointer-events-none relative flex cursor-pointer justify-center border border-violet-200 transition-all duration-100 hover:border-violet-900"
          style={{
            height: `${height * scale}px`,
            maxWidth: `${width * scale}px`,
            top: `${(top - canvasY) * scale}px`,
            left: `${(left - canvasX) * scale}px`,
            width: '100%',
            position: 'absolute',
          }}
        >
          <div
            data-canvas-overlay-highlight-label
            ref={props.canvasOverlayLabelRef}
            className="absolute z-[1] translate-y-[-10px] rounded-full bg-violet-900 px-3 py-0.5 text-xs text-white group-hover:block"
          >
            {item.getAttribute(DATA_DISPLAY_NAME) ||
              item.getAttribute(DATA_LABEL) ||
              ''}
          </div>
        </div>
      );
    });

    setGrid(gridElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedTemplate, showGrid, styles, transitioned]);

  return (
    <div
      ref={canvasOverlayRef}
      data-canvas-overlay
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div
        data-canvas-overlay-highlight="active"
        className="absolute border-2 border-violet-500 empty:hidden"
        ref={canvasOverlayHighlightRef}
        data-target-id={selectedComonentPath}
      >
        {selectedElement && (
          <div
            data-canvas-overlay-controls
            ref={canvasOverlayControlsRef}
            className="pointer-events-auto absolute top-0 z-30 flex translate-x-[-2px] translate-y-[-32px] bg-white shadow-xl"
          >
            <ElementInfoButton />
            <DuplicateElementButton />
            <DeleteElementButton />
          </div>
        )}
      </div>

      {showGrid && <>{grid}</>}
    </div>
  );
};

export default CanvasOverlay;
