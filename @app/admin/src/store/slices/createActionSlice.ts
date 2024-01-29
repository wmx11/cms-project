import { SCALE_MAX, SCALE_MIN } from '@cms/template-engine/constants';
import { StateCreator } from 'zustand';

export interface ActionSlice {
  isContextMenuOpen: boolean;
  isCommandOpen: boolean;
  showGrid: boolean;
  canvasScale: number;
  isScaling: boolean;
  setIsCommandOpen: (isCommandOpen: boolean) => void;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  toggleGrid: () => void;
  setIsScaling: (isScaling: boolean) => void;
  setCanvasScale: (scaleBy: number, scale?: number) => void;
  resetCanvasScale: () => void;
}

const createActionSlice: StateCreator<ActionSlice> = (set, get) => ({
  isCommandOpen: false,
  isContextMenuOpen: false,
  showGrid: false,
  canvasScale: 1,
  isScaling: false,
  setIsCommandOpen: (isCommandOpen: boolean) => set(() => ({ isCommandOpen })),
  setIsContextMenuOpen: (isContextMenuOpen: boolean) =>
    set(() => ({ isContextMenuOpen })),
  toggleGrid: () => set(() => ({ showGrid: !get().showGrid })),
  setIsScaling: (isScaling: boolean) => set(() => ({ isScaling })),
  setCanvasScale: (scaleBy: number, scale?: number) =>
    set(() => {
      const newScale = scale ? scale : get().canvasScale + scaleBy;
      return {
        canvasScale: Math.min(Math.max(newScale, SCALE_MIN), SCALE_MAX),
      };
    }),
  resetCanvasScale: () => set(() => ({ canvasScale: 1 })),
});

export default createActionSlice;
