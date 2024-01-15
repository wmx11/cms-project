import {
  BREAKPOINTS_MAP,
  BREAKPOINT_2XL_KEY,
  BREAKPOINT_LG_KEY,
  BREAKPOINT_MD_KEY,
  BREAKPOINT_SM_KEY,
  BREAKPOINT_XL_KEY,
  BREAKPOINT_XS,
  BREAKPOINT_XS_KEY,
} from '@cms/packages/template-engine/constants';
import { JssStyle, StyleSheet } from 'jss';
import { StateCreator } from 'zustand';

export const initialStyles = {
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
  styleElement: Element | undefined;
  breakpoint: Breakpoints;
  setBreakpoint: (breakpoint: Breakpoints) => void;
  setStyleElement: (styleElement: Element) => void;
  setStyleSheet: (styleSheet: StyleSheet) => void;
  setStyles: (styles: StylesObjectWithBreakpoints) => void;
};

const createStylesSlice: StateCreator<StylesSlice> = (set) => ({
  styles: initialStyles,
  styleSheet: undefined,
  styleElement: undefined,
  breakpoint: BREAKPOINT_XS,
  setBreakpoint: (breakpoint: Breakpoints) => set(() => ({ breakpoint })),
  setStyleElement: (styleElement: Element) => set(() => ({ styleElement })),
  setStyleSheet: (styleSheet: StyleSheet) => set(() => ({ styleSheet })),
  setStyles: (styles: StylesObjectWithBreakpoints) => set(() => ({ styles })),
});

export default createStylesSlice;
