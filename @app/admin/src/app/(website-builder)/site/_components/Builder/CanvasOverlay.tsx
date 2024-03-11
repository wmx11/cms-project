'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_COMPONENT,
  DATA_DISPLAY_NAME,
  DATA_LABEL,
} from '@cms/packages/tiglee-engine/constants';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import DeleteElementButton from './canvas-controls/element-overlay-controls/DeleteElementButton';
import DuplicateElementButton from './canvas-controls/element-overlay-controls/DuplicateElementButton';
import ElementInfoButton from './canvas-controls/element-overlay-controls/ElementInfoButton';

export interface CanvasOverlayProps {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayHighlightHoverRef: RefObject<HTMLDivElement>;
  canvasOverlayLabelRef: RefObject<HTMLDivElement>;
}

const CanvasOverlay: FC<CanvasOverlayProps> = (props) => {
  const {
    canvasRef: { current: canvas },
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
  const canvasScale = useBuilderProviderState((state) => state.canvasScale);
  const breakpoint = useBuilderProviderState((state) => state.breakpoint);
  const showGrid = useBuilderProviderState((state) => state.showGrid);
  const styles = useBuilderProviderState((state) => state.styles);

  const canvasOverlayControlsRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<JSX.Element[] | null>(null);

  const scale = 1 / canvasScale || 1;

  useEffect(() => {
    if (!canvasOverlayHighlightRef.current) {
      return;
    }

    if (!canvas) {
      return;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    if (!selectedElement) {
      return;
    }

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
  }, [breakpoint, renderedTemplate, selectedElement, showGrid, styles]);

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

    const gridElements = [...components]?.map((item) => {
      const { height, width, top, left } = item?.getBoundingClientRect();

      return (
        <div
          data-target-id={item.id}
          data-canvas-overlay-highlight="hover"
          className={twMerge(
            `group group pointer-events-auto relative flex cursor-pointer justify-center border border-violet-200 transition-colors hover:border-violet-900`,
            selectedComonentPath ? 'pointer-events-none' : ''
          )}
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
            className={`absolute hidden translate-y-[-10px] rounded-full bg-violet-900 px-3 py-0.5 text-xs text-white group-hover:block`}
          >
            {item.getAttribute(DATA_DISPLAY_NAME) ||
              item.getAttribute(DATA_LABEL) ||
              ''}
          </div>
        </div>
      );
    });

    setGrid(gridElements);
  }, [breakpoint, renderedTemplate, showGrid, styles]);

  return (
    <div
      data-canvas-overlay
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div
        data-canvas-overlay-highlight="active"
        className="absolute z-10 border-2 border-violet-500 empty:hidden"
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
