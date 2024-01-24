'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { DATA_COMPONENT, DATA_LABEL } from '@cms/template-engine/constants';
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

  const {
    selectedComonentPath,
    renderedTemplate,
    selectedElement,
    breakpoint,
    showGrid,
    styles,
  } = useBuilderProviderState();

  const [highlightStyles, setHighlightStyles] = useState({});
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightActiveRef = useRef<HTMLDivElement>(null);
  const canvasOverlayControlsRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    if (!canvas) {
      return setHighlightStyles({});
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    if (!selectedElement) {
      return setHighlightStyles({});
    }

    const { height, width, top, left } =
      selectedElement?.getBoundingClientRect();

    setHighlightStyles({
      height: `${height}px`,
      width: `${width}px`,
      top: `${top - canvasY}px`,
      left: `${left - canvasX}px`,
    });
  }, [breakpoint, renderedTemplate, selectedElement]);

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
            `border border-violet-200 hover:border-violet-900 cursor-pointer transition-colors group flex justify-center pointer-events-auto relative group`,
            selectedComonentPath ? 'pointer-events-none' : ''
          )}
          style={{
            height: `${height}px`,
            maxWidth: `${width}px`,
            top: `${top - canvasY}px`,
            left: `${left - canvasX}px`,
            width: '100%',
            position: 'absolute',
          }}
        >
          <div
            data-canvas-overlay-highlight-label
            ref={props.canvasOverlayLabelRef}
            className={`px-3 py-0.5 rounded-full bg-violet-900 text-[8px] absolute text-white translate-y-[-9px] hidden group-hover:block`}
          >
            {item.getAttribute(DATA_LABEL) || ''}
          </div>
        </div>
      );
    });

    setGrid(gridElements);
  }, [breakpoint, renderedTemplate, selectedElement, showGrid, styles]);

  return (
    <div
      data-canvas-overlay
      ref={canvasOverlayRef}
      className="absolute inset-0 pointer-events-none z-10"
    >
      <div
        data-canvas-overlay-highlight="active"
        ref={canvasOverlayHighlightActiveRef}
        style={highlightStyles}
        data-target-id={selectedComonentPath}
        className="border-2 border-violet-500 absolute empty:hidden z-10"
      >
        {selectedElement && (
          <div
            data-canvas-overlay-controls
            ref={canvasOverlayControlsRef}
            className="flex bg-white shadow-xl absolute top-0 translate-y-[-32px] translate-x-[-2px] pointer-events-auto z-30"
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
