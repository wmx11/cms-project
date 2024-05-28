import { StateCreator } from 'zustand';

export interface HistorySlice {
  history: [];
  maxHistory: number;
  pushHistory: () => void;
  resetHistory: () => void;
  undo: () => void;
}

const createHistorySlice: StateCreator<HistorySlice> = (set, get) => ({
    history: [],
    maxHistory: 10,
    pushHistory: () => { },
    resetHistory: () => set(() => ({ history: [] })),
    undo: () => {}
});

export default createHistorySlice;
