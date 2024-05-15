import { JssStyle } from 'jss';
import {
  BREAKPOINTS_MAP,
  BREAKPOINT_2XL_KEY,
  BREAKPOINT_DEFAULT_KEY,
  BREAKPOINT_LG_KEY,
  BREAKPOINT_MD_KEY,
  BREAKPOINT_SM_KEY,
  BREAKPOINT_XL_KEY,
  BREAKPOINT_XS_KEY,
  BUILDER_DATA_THEME_TYPE,
  THEME_NAME_VAR,
} from '../constants';

export type StylesObject = JssStyle;

export type StylesObjectWithBreakpoints = StylesObject & typeof initialStyles;

export type Breakpoints = keyof typeof BREAKPOINTS_MAP;

export const initialStyles = {
  '@global': {
    ':root': {
      [THEME_NAME_VAR]: '',
    },
    [`[${BUILDER_DATA_THEME_TYPE}="dark"]`]: {},
  },
  [BREAKPOINT_DEFAULT_KEY]: {},
  [BREAKPOINT_XS_KEY]: {},
  [BREAKPOINT_SM_KEY]: {},
  [BREAKPOINT_MD_KEY]: {},
  [BREAKPOINT_LG_KEY]: {},
  [BREAKPOINT_XL_KEY]: {},
  [BREAKPOINT_2XL_KEY]: {},
};
