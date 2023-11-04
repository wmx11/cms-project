import { RefObject } from 'react';
import { StateCreator } from 'zustand';
import { SetIsOpen, SetTriggerRef } from '../../types';

export type ActionSlice = {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement>;
} & SetIsOpen &
  SetTriggerRef;

const createActionSlice: StateCreator<ActionSlice> = (set) => ({
  isOpen: true,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  triggerRef: { current: null },
  setTriggerRef: (triggerRef: RefObject<HTMLElement>) =>
    set(() => ({ triggerRef })),
});

export default createActionSlice;
