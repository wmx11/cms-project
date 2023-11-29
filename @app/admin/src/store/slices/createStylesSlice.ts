import { StateCreator } from 'zustand';
import builderJss from '@cms/template-engine/styles/builderJss';
import { StyleSheet } from 'jss';

export type StylesSlice = {
  styles: Record<string, string>;
  styleSheet: StyleSheet | undefined;
  setStyleSheet: (styleSheet: StyleSheet) => void;
  setStyles: (style: Record<string, string>) => void;
};

const createStylesSlice: StateCreator<StylesSlice> = (set, get) => ({
  styles: {},
  styleSheet: undefined,
  setStyleSheet: (styleSheet: StyleSheet) => set(() => ({ styleSheet })),
  setStyles: (style: Record<string, string>) =>
    set(() => ({ styles: { ...get().styles, ...style } })),
});

export default createStylesSlice;
