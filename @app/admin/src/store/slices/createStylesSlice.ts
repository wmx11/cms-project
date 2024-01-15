import {
  BREAKPOINT_2XL_KEY,
  BREAKPOINT_XL_KEY,
  BREAKPOINT_LG_KEY,
  BREAKPOINT_MD_KEY,
  BREAKPOINT_SM_KEY,
  BREAKPOINT_SM,
  BREAKPOINT_MD,
  BREAKPOINT_LG,
  BREAKPOINT_XL,
  BREAKPOINT_2XL,
  BREAKPOINT_XS,
  BREAKPOINT_XS_KEY,
} from '@cms/packages/template-engine/constants';
import { StyleSheet } from 'jss';
import { StateCreator } from 'zustand';
import { JssStyle } from 'jss';

export type StylesObject = JssStyle;

export type Breakpoints =
  | typeof BREAKPOINT_XS
  | typeof BREAKPOINT_SM
  | typeof BREAKPOINT_MD
  | typeof BREAKPOINT_LG
  | typeof BREAKPOINT_XL
  | typeof BREAKPOINT_2XL;

export type StylesSlice = {
  styles: StylesObject;
  styleSheet: StyleSheet | undefined;
  styleElement: Element | undefined;
  breakpoint: Breakpoints;
  setBreakpoint: (breakpoint: Breakpoints) => void;
  setStyleElement: (styleElement: Element) => void;
  setStyleSheet: (styleSheet: StyleSheet) => void;
  setStyles: (styles: StylesObject) => void;
};

const createStylesSlice: StateCreator<StylesSlice> = (set) => ({
  styles: {
    [BREAKPOINT_XS_KEY]: {},
    [BREAKPOINT_SM_KEY]: {},
    [BREAKPOINT_MD_KEY]: {},
    [BREAKPOINT_LG_KEY]: {},
    [BREAKPOINT_XL_KEY]: {},
    [BREAKPOINT_2XL_KEY]: {},
  },
  styleSheet: undefined,
  styleElement: undefined,
  breakpoint: BREAKPOINT_XS,
  setBreakpoint: (breakpoint: Breakpoints) => set(() => ({ breakpoint })),
  setStyleElement: (styleElement: Element) => set(() => ({ styleElement })),
  setStyleSheet: (styleSheet: StyleSheet) => set(() => ({ styleSheet })),
  setStyles: (styles: StylesObject) => set(() => ({ styles })),
});

export default createStylesSlice;
