// GENERIC
export const PATH_SEPARATOR = '_';
export const DEFAULT_UNIT = 'px';
export const ACTIVE = 'active';
export const HOVER = 'hover';
export const DRAGGABLE = 'draggable';

//DATA ATTRIBUTES
export const DATA_LABEL = 'data-label';
export const DATA_CANVAS = 'data-canvas';
export const DATA_SCHEMA = 'data-schema';
export const DATA_EDITABLE = 'data-editable';
export const DATA_COMPONENT = 'data-component';
export const DATA_TARGET_ID = 'data-target-id';
export const DATA_LAYER_ITEM = 'data-layer-item';
export const DATA_DESCRIPTION = 'data-description';
export const DATA_DISPLAY_NAME = 'data-display-name';
export const DATA_CANVAS_OVERLAY = 'data-canvas-overlay';
export const DATA_DND_INITIALIZED = 'data-dnd-initialized';
export const DATA_ACCEPTS_CHILDREN = 'data-accepts-children';
export const DATA_CANVAS_OVERLAY_HIGHLIGHT = 'data-canvas-overlay-highlight';
export const DRATA_CANVAS_OVERLAY_DRAG_AND_DROP_HIGHLIGHT =
  'data-canvas-drag-and-drop-highlight';
export const DATA_CANVAS_OVERLAY_HIGHLIGHT_LABEL =
  'data-canvas-overlay-highlight-label';
export const DATA_CANVAS_OVERLAY_CONTROLS = 'data-canvas-overlay-controls';
export const DATA_CANVAS_OVERLAY_ADD_ELEMENT_BUTTON =
  'data-canvas-overlay-add-element-button';
export const DATA_CANVAS_OVERLAY_CONTEXT_MENU_TARGET =
  'data-canvas-overlay-context-menu-target';

// STYLES
export const STYLES_CONTENT_EDITABLE =
  'before:content-[""] before:absolute before:inset-0 before:z-10';
export const STLYES_ELEMENT_INSIDE_BUILDER =
  'relative border border-dashed border-violet-200 hover:border-violet-300 cursor-pointer transition-colors m-[-1px]';

export const BREAKPOINT_DEFAULT_WIDTH = 1920;
export const BREAKPOINT_DEFAULT = 10;
export const BREAKPOINT_XS = 320;
export const BREAKPOINT_SM = 640;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;
export const BREAKPOINT_XL = 1280;
export const BREAKPOINT_2XL = 1536;

export const BREAKPOINT_DEFAULT_KEY = `@container (min-width: ${BREAKPOINT_DEFAULT}px)`;
export const BREAKPOINT_XS_KEY = `@container (min-width: ${BREAKPOINT_XS}px)`;
export const BREAKPOINT_SM_KEY = `@container (min-width: ${BREAKPOINT_SM}px)`;
export const BREAKPOINT_MD_KEY = `@container (min-width: ${BREAKPOINT_MD}px)`;
export const BREAKPOINT_LG_KEY = `@container (min-width: ${BREAKPOINT_LG}px)`;
export const BREAKPOINT_XL_KEY = `@container (min-width: ${BREAKPOINT_XL}px)`;
export const BREAKPOINT_2XL_KEY = `@container (min-width: ${BREAKPOINT_2XL}px)`;

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

// CSS Variables
export const LAYOUT_TYPE = '--layout-type';
export const GAP = '--gap';
export const FLEX_COLUMNS = '--flex-columns';
export const BASIS = '--basis';

// Theme variables
