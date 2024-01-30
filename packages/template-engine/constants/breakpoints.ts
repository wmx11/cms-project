/**
 * @description Constants to handle breakpoints (Based on Tailwind CSS)
 * '@container' is used instead of '@media' to simulate responsiveness
 * They are replaced with '@media' when accessing the published site
 */
export const BREAKPOINT_DEFAULT_WIDTH = 1920;
export const BREAKPOINT_DEFAULT = 10;
export const BREAKPOINT_XS = 320;
export const BREAKPOINT_SM = 640;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;
export const BREAKPOINT_XL = 1280;
export const BREAKPOINT_2XL = 1536;

const makeKey = (breakpoint: number) =>
  `@container (min-width: ${breakpoint}px)`;

export const BREAKPOINT_DEFAULT_KEY = makeKey(BREAKPOINT_DEFAULT);
export const BREAKPOINT_XS_KEY = makeKey(BREAKPOINT_XS);
export const BREAKPOINT_SM_KEY = makeKey(BREAKPOINT_SM);
export const BREAKPOINT_MD_KEY = makeKey(BREAKPOINT_MD);
export const BREAKPOINT_LG_KEY = makeKey(BREAKPOINT_LG);
export const BREAKPOINT_XL_KEY = makeKey(BREAKPOINT_XL);
export const BREAKPOINT_2XL_KEY = makeKey(BREAKPOINT_2XL);

export interface BreakpointsMap {
  [BREAKPOINT_DEFAULT]: typeof BREAKPOINT_DEFAULT_KEY;
  [BREAKPOINT_XS]: typeof BREAKPOINT_XS_KEY;
  [BREAKPOINT_SM]: typeof BREAKPOINT_SM_KEY;
  [BREAKPOINT_MD]: typeof BREAKPOINT_MD_KEY;
  [BREAKPOINT_LG]: typeof BREAKPOINT_LG_KEY;
  [BREAKPOINT_XL]: typeof BREAKPOINT_XL_KEY;
  [BREAKPOINT_2XL]: typeof BREAKPOINT_2XL_KEY;
}

export const BREAKPOINTS_MAP: BreakpointsMap = {
  [BREAKPOINT_DEFAULT]: BREAKPOINT_DEFAULT_KEY,
  [BREAKPOINT_XS]: BREAKPOINT_XS_KEY,
  [BREAKPOINT_SM]: BREAKPOINT_SM_KEY,
  [BREAKPOINT_MD]: BREAKPOINT_MD_KEY,
  [BREAKPOINT_LG]: BREAKPOINT_LG_KEY,
  [BREAKPOINT_XL]: BREAKPOINT_XL_KEY,
  [BREAKPOINT_2XL]: BREAKPOINT_2XL_KEY,
};
