/**
 * @description CSS variables used by JSS to configure themes, templates, and styling of components
 */
export const BUILDER_PREFIX = 'tg';
export const BUILDER_STYLES_META_TAG = `${BUILDER_PREFIX}-builder-styles`;
export const BUILDER_STYLES_META_TAG_SELECTOR = `data-meta="${BUILDER_PREFIX}-builder-styles"`;

// ="light" or ="dark"
export const BUILDER_DATA_THEME_TYPE = `data-${BUILDER_PREFIX}-theme-type`;

// One of the names from packages/template-engine/themes/index.ts
export const BUILDER_DATA_THEME_NAME = `data-${BUILDER_PREFIX}-theme-name`;

export const GAP = `--${BUILDER_PREFIX}-gap`;
export const BASIS = `--${BUILDER_PREFIX}-basis`;
export const LAYOUT_TYPE = `--${BUILDER_PREFIX}-layout-type`;
export const FLEX_COLUMNS = `--${BUILDER_PREFIX}-flex-columns`;

// This can be assigned to <main>, <body>, or primary wrapper component
export const PARENT_CLASS = `${BUILDER_PREFIX}-wrapper`;

export const THEME_NAME_VAR = `--${BUILDER_PREFIX}-theme-name`;

// Theme variables
export const BORDER = `${BUILDER_PREFIX}-border`;
export const BORDER_VAR = `--${BUILDER_PREFIX}-border`;

export const INPUT = `${BUILDER_PREFIX}-input`;
export const INPUT_VAR = `--${BUILDER_PREFIX}-input`;

export const RING = `${BUILDER_PREFIX}-ring`;
export const RING_VAR = `--${BUILDER_PREFIX}-ring`;

export const BACKGROUND = `${BUILDER_PREFIX}-background`;
export const BACKGROUND_VAR = `--${BUILDER_PREFIX}-background`;

export const FOREGROUND = `${BUILDER_PREFIX}-foreground`;
export const FOREGROUND_VAR = `--${BUILDER_PREFIX}-foreground`;

export const PRIMARY = `${BUILDER_PREFIX}-primary`;
export const PRIMARY_VAR = `--${BUILDER_PREFIX}-primary`;
export const PRIMARY_FOREGROUND_VAR = `--${BUILDER_PREFIX}-primary-foreground`;

export const SECONDARY = `${BUILDER_PREFIX}-secondary`;
export const SECONDARY_VAR = `--${BUILDER_PREFIX}-secondary`;
export const SECONDARY_FOREGROUND_VAR = `--${BUILDER_PREFIX}-secondary-foreground`;

export const DESTRUCTIVE = `${BUILDER_PREFIX}-destructive`;
export const DESTRUCTIVE_VAR = `--${BUILDER_PREFIX}-destructive`;
export const DESTRUCTIVE_FOREGROUND_VAR = `--${BUILDER_PREFIX}-destructive-foreground`;

export const MUTED = `${BUILDER_PREFIX}-muted`;
export const MUTED_VAR = `--${BUILDER_PREFIX}-muted`;
export const MUTED_FOREGROUND_VAR = `--${BUILDER_PREFIX}-muted-foreground`;

export const ACCENT = `${BUILDER_PREFIX}-accent`;
export const ACCENT_VAR = `--${BUILDER_PREFIX}-accent`;
export const ACCENT_FOREGROUND_VAR = `--${BUILDER_PREFIX}-accent-foreground`;

export const POPOVER = `${BUILDER_PREFIX}-popover`;
export const POPOVER_VAR = `--${BUILDER_PREFIX}-popover`;
export const POPOVER_FOREGROUND_VAR = `--${BUILDER_PREFIX}-popover-foreground`;

export const CARD = `${BUILDER_PREFIX}-card`;
export const CARD_VAR = `--${BUILDER_PREFIX}-card`;
export const CARD_FOREGROUND_VAR = `--${BUILDER_PREFIX}-card-foreground`;

export const RADIUS = `${BUILDER_PREFIX}-radius`;
export const RADIUS_VAR = `--${BUILDER_PREFIX}-radius`;

export const BORDER_RADIUS = `${BUILDER_PREFIX}-border-radius`;
export const BORDER_RADIUS_VAR = `--${BUILDER_PREFIX}-border-radius`;
