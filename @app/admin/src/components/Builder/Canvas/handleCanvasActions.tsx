import { MouseEvent, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import CanvasElementControlButtons from '../Controls/CanvasElementControlButtons';
import { Component } from '@prisma/client';
import {
  DATA_COMPONENT,
  DATA_EDITABLE,
} from '@cms/template-engine/constants/dataAttributes';

type HandleCanvasClickProps = {
  canvasRef: RefObject<HTMLDivElement>;
  canvasOverlayRef: RefObject<HTMLDivElement>;
  templateComponents: Component[];
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleSelect: (key: React.Key, path: string) => void;
};

const handleEditableInput = (e: Event) => {
  const target = e.target as HTMLBaseElement;

  console.log(target.innerText);
};

const handleEditableBlur = (e: Event) => {
  const target = e.target as HTMLBaseElement;

  target.removeAttribute('contentEditable');

  console.log(target);

  target.classList.add(
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'relative'
  );

  target.removeEventListener('blur', handleEditableBlur);
  target.removeEventListener('input', handleEditableInput);
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

    if (!target.hasAttribute(DATA_COMPONENT)) {
      return;
    }

    if (
      target.hasAttribute(DATA_EDITABLE) &&
      target.contentEditable !== 'true'
    ) {
      target.classList.remove(
        'before:content-[""]',
        'before:absolute',
        'before:inset-0'
      );

      target.setAttribute('contentEditable', 'true');
      target.addEventListener('input', handleEditableInput);
      target.addEventListener('blur', handleEditableBlur);
      target.focus();
      target.style.outline = 'none';
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

    highlight.classList.add(
      'border-2',
      'border-violet-900',
      'bg-violet-400/10'
    );

    controls.classList.add(
      'border',
      'border-violet-900',
      'shadow-lg',
      'rounded-lg',
      'overflow-hidden'
    );

    // Apply styles
    Object.assign(highlight.style, {
      position: 'absolute',
      height: `${targetHeight}px`,
      width: `${targetWidth}px`,
      top: `${targetY - canvasY}px`,
      left: `${targetX - canvasX}px`,
    });

    Object.assign(controls.style, {
      transform: 'translateY(-46px) translateX(-2px)',
      position: 'absolute',
      top: '0',
      zIndex: '100',
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

    if (!target.hasAttribute(DATA_COMPONENT)) {
      return;
    }

    const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

    setTriggerRef({ current: null });

    const contextTargetElement = document.querySelector(
      '.context-target'
    ) as HTMLDivElement;

    const contextTarget = contextTargetElement
      ? contextTargetElement
      : document.createElement('div');

    Object.assign(contextTarget.style, {
      position: 'absolute',
      top: `${event.pageY - canvasY}px`,
      left: `${event.pageX - canvasX}px`,
      width: '100px',
      height: '1px',
    });

    contextTarget.id = target.id;

    if (!contextTargetElement) {
      contextTarget.classList.add('context-target');
      canvasOverlay.appendChild(contextTarget);
    }

    setTriggerRef({ current: contextTarget });
    setIsOpen(true);
  };
