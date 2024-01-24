import { StateCreator } from 'zustand';

export interface ActionSlice {
  isContextMenuOpen: boolean;
  isCommandOpen: boolean;
  showGrid: boolean;
  setIsCommandOpen: (isCommandOpen: boolean) => void;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  setShowGrid: (showGrid: boolean) => void;
}

const createActionSlice: StateCreator<ActionSlice> = (set) => ({
  isCommandOpen: false,
  isContextMenuOpen: false,
  showGrid: false,
  setIsCommandOpen: (isCommandOpen: boolean) => set(() => ({ isCommandOpen })),
  setIsContextMenuOpen: (isContextMenuOpen: boolean) =>
    set(() => ({ isContextMenuOpen })),
  setShowGrid: (showGrid: boolean) => set(() => ({ showGrid })),
});

export default createActionSlice;
