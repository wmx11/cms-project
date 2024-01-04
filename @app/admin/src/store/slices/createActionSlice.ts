import { RefObject } from 'react';
import { StateCreator } from 'zustand';
import { SetIsOpen, SetTriggerRef } from '../../types';

export interface ActionSlice {
  isContextMenuOpen: boolean;
  isCommandOpen: boolean;
  setIsCommandOpen: (isCommandOpen: boolean) => void;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
}

const createActionSlice: StateCreator<ActionSlice> = (set) => ({
  isCommandOpen: false,
  isContextMenuOpen: false,
  setIsCommandOpen: (isCommandOpen: boolean) => set(() => ({ isCommandOpen })),
  setIsContextMenuOpen: (isContextMenuOpen: boolean) =>
    set(() => ({ isContextMenuOpen })),
});

export default createActionSlice;
