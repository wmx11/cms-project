import { MouseEvent, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import CanvasElementControlButtons from './CanvasElementControlButtons';
import { Component } from '@prisma/client';

type HandleCanvasClickProps = {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
  templateComponents: Component[];
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleSelect: (key: React.Key, path: string) => void;
};

export const handleCanvasClick =
  (props: HandleCanvasClickProps) => (event: MouseEvent<HTMLDivElement>) => {
    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
      templateComponents,
      setTriggerRef,
      setIsOpen,
      handleSelect,
    } = props;

    if (!canvas || !canvasOverlay) {
      return;
    }

    const target = event.target as HTMLBaseElement;

    if (!target) {
      return;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    const {
      height: targetHeight,
      width: targetWidth,
      x: targetX,
      y: targetY,
    } = target.getBoundingClientRect();

    // Reset the state
    canvasOverlay.innerHTML = '';

    // Used to draw borders around selected elements
    const highlight = document.createElement('div');

    // Used to draw controls (add, edit, delete) for the selected element
    const controls = document.createElement('div');

    highlight.classList.add('border-2', 'border-violet-900');
    controls.classList.add('border-2', 'border-violet-900');

    // Apply styles
    Object.assign(highlight.style, {
      position: 'absolute',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });

    Object.assign(controls.style, {
      transform: 'translateY(46px)',
      position: 'absolute',
      bottom: '0',
      zIndex: '10',
    });

    // Add element control buttons
    createRoot(controls).render(
      CanvasElementControlButtons({
        target,
        handleSelect,
        setIsOpen,
        setTriggerRef,
        templateComponents,
      })
    );

    canvasOverlay.appendChild(highlight);
    highlight.appendChild(controls);
  };

export const handleCanvasContextMenu =
  (props: {
    canvasRef: RefObject<HTMLDivElement>;
    canvasOverlayRef: RefObject<HTMLDivElement>;
    setTriggerRef: (ref: RefObject<HTMLElement>) => void;
    setIsOpen: (isOpen: boolean) => void;
  }) =>
  (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const {
      canvasRef: { current: canvas },
      canvasOverlayRef: { current: canvasOverlay },
      setIsOpen,
      setTriggerRef,
    } = props;

    if (!canvas || !canvasOverlay) {
      return;
    }

    const target = event.target as HTMLBaseElement;

    if (!target) {
      return;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    canvasOverlay.innerHTML = '';

    setTriggerRef({ current: null });

    const contextTarget = document.createElement('div');

    Object.assign(contextTarget.style, {
      position: 'absolute',
      top: `${event.pageY - canvasY}px`,
      left: `${event.pageX - canvasX}px`,
      width: '100px',
      height: '1px',
    });

    contextTarget.id = target.id;

    canvasOverlay.appendChild(contextTarget);

    setTriggerRef({ current: contextTarget });
    setIsOpen(true);
  };
