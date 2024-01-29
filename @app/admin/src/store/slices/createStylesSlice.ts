import {
  BREAKPOINTS_MAP,
  BREAKPOINT_2XL_KEY,
  BREAKPOINT_LG_KEY,
  BREAKPOINT_MD_KEY,
  BREAKPOINT_SM_KEY,
  BREAKPOINT_XL_KEY,
  BREAKPOINT_DEFAULT,
  BREAKPOINT_DEFAULT_KEY,
  BREAKPOINT_XS_KEY,
} from '@cms/packages/template-engine/constants';
import { JssStyle, StyleSheet } from 'jss';
import { StateCreator } from 'zustand';

export const initialStyles = {
  '@global': {},
  [BREAKPOINT_DEFAULT_KEY]: {},
  [BREAKPOINT_XS_KEY]: {},
  [BREAKPOINT_SM_KEY]: {},
  [BREAKPOINT_MD_KEY]: {},
  [BREAKPOINT_LG_KEY]: {},
  [BREAKPOINT_XL_KEY]: {},
  [BREAKPOINT_2XL_KEY]: {},
};

export type StylesObject = JssStyle;

export type StylesObjectWithBreakpoints = StylesObject & typeof initialStyles;

export type Breakpoints = keyof typeof BREAKPOINTS_MAP;

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
