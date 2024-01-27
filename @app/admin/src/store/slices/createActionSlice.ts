import { StateCreator } from 'zustand';

export interface ActionSlice {
  isContextMenuOpen: boolean;
  isCommandOpen: boolean;
  showGrid: boolean;
  canvasScale: number;
  isScaling: boolean;
  setIsCommandOpen: (isCommandOpen: boolean) => void;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  setShowGrid: (showGrid: boolean) => void;
  setIsScaling: (isScaling: boolean) => void;
  setCanvasScale: (scale: number) => void;
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
  setShowGrid: (showGrid: boolean) => set(() => ({ showGrid })),
  setIsScaling: (isScaling: boolean) => set(() => ({ isScaling })),
  setCanvasScale: (scale: number) =>
    set(() => {
      let newScale = get().canvasScale + scale;

      if (newScale < 0) {
        newScale = 0.1;
      }

      if (newScale > 2) {
        newScale = 2;
      }

      return {
        canvasScale: newScale,
      };
    }),
  resetCanvasScale: () => set(() => ({ canvasScale: 1 })),
});

export default createActionSlice;
