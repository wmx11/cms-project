import { BREAKPOINT_DEFAULT } from '@cms/packages/tiglee-engine/constants';
import type {
  Breakpoints,
  StylesObjectWithBreakpoints,
} from '@cms/packages/tiglee-engine/styles/jssStyles';
import { initialStyles } from '@cms/packages/tiglee-engine/styles/jssStyles';
import { StyleSheet } from 'jss';
import { StateCreator } from 'zustand';

export type StylesSlice = {
  styles: StylesObjectWithBreakpoints;
  styleSheet: StyleSheet | undefined;
  breakpoint: Breakpoints;
  setBreakpoint: (breakpoint: Breakpoints) => void;
  setStyleSheet: (styleSheet: StyleSheet) => void;
  setStyles: (styles: StylesObjectWithBreakpoints) => void;
};

const createStylesSlice: StateCreator<StylesSlice> = (set) => ({
  styles: initialStyles,
  styleSheet: undefined,
  breakpoint: BREAKPOINT_DEFAULT,
  setBreakpoint: (breakpoint: Breakpoints) => set(() => ({ breakpoint })),
  setStyleSheet: (styleSheet: StyleSheet) => set(() => ({ styleSheet })),
  setStyles: (styles: StylesObjectWithBreakpoints) => set(() => ({ styles })),
});

export default createStylesSlice;
