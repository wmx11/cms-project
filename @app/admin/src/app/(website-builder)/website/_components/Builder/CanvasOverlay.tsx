'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
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
    selectedComponent,
    selectedComonentPath,
    selectedElement,
    renderedTemplate,
    breakpoint,
  } = useBuilderProviderState();

  const [highlightStyles, setHighlightStyles] = useState({});
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const canvasOverlayHighlightActiveRef = useRef<HTMLDivElement>(null);
  const canvasOverlayControlsRef = useRef<HTMLDivElement>(null);

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
        className="border-2 border-violet-500 absolute empty:hidden"
      >
        {selectedElement && (
          <div
            data-canvas-overlay-controls
            ref={canvasOverlayControlsRef}
            className="flex bg-white shadow-xl absolute top-0 translate-y-[-32px] translate-x-[-2px] pointer-events-auto z-10"
          >
            <ElementInfoButton />
            <DuplicateElementButton />
            <DeleteElementButton />
          </div>
        )}
      </div>
      <div
        data-canvas-overlay-highlight="hover"
        ref={props.canvasOverlayHighlightHoverRef}
        style={highlightStyles}
        className="border-2 border-violet-900 absolute flex justify-center pointer-events-none"
      >
        <div
          data-canvas-overlay-highlight-label
          ref={props.canvasOverlayLabelRef}
          className={`px-3 py-0.5 rounded-full bg-violet-900 text-xs absolute text-white translate-y-[-12px] ${
            selectedElement ? 'block' : 'hidden'
          }`}
        >
          {selectedComponent?.displayName || selectedComponent?.component}
        </div>
      </div>
    </div>
  );
};

export default CanvasOverlay;
