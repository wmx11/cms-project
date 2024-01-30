import {
  ACCENT_FOREGROUND_VAR,
  ACCENT_VAR,
  BACKGROUND_VAR,
  BORDER_VAR,
  CARD_FOREGROUND_VAR,
  CARD_VAR,
  DESTRUCTIVE_FOREGROUND_VAR,
  DESTRUCTIVE_VAR,
  FOREGROUND_VAR,
  INPUT_VAR,
  MUTED_FOREGROUND_VAR,
  MUTED_VAR,
  POPOVER_FOREGROUND_VAR,
  POPOVER_VAR,
  PRIMARY_FOREGROUND_VAR,
  PRIMARY_VAR,
  RADIUS_VAR,
  RING_VAR,
  SECONDARY_FOREGROUND_VAR,
  SECONDARY_VAR,
} from '../constants';

export interface BuilderThemes {
  [k: string]: {
    light: {
      [k: string]: string;
    };
    dark: {
      [k: string]: string;
    };
  };
}

const themes: BuilderThemes = {
  violet: {
    light: {
      [BACKGROUND_VAR]: '280 46% 14%',
      [FOREGROUND_VAR]: '224 71.4% 4.1%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [PRIMARY_VAR]: '262.1 83.3% 57.8%',
      [PRIMARY_FOREGROUND_VAR]: '210 20% 98%',
      [SECONDARY_VAR]: '220 14.3% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [MUTED_VAR]: '220 14.3% 95.9%',
      [MUTED_FOREGROUND_VAR]: '220 8.9% 46.1%',
      [ACCENT_VAR]: '220 14.3% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 20% 98%',
      [BORDER_VAR]: '220 13% 91%',
      [INPUT_VAR]: '220 13% 91%',
      [RING_VAR]: '262.1 83.3% 57.8%',
      [RADIUS_VAR]: '1rem',
    },
    dark: {},
  },
  sandy: {
    light: {
      [BACKGROUND_VAR]: '50 16% 74%',
      [FOREGROUND_VAR]: '224 71.4% 4.1%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [PRIMARY_VAR]: '262.1 83.3% 57.8%',
      [PRIMARY_FOREGROUND_VAR]: '210 20% 98%',
      [SECONDARY_VAR]: '220 14.3% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [MUTED_VAR]: '220 14.3% 95.9%',
      [MUTED_FOREGROUND_VAR]: '220 8.9% 46.1%',
      [ACCENT_VAR]: '220 14.3% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 20% 98%',
      [BORDER_VAR]: '220 13% 91%',
      [INPUT_VAR]: '220 13% 91%',
      [RING_VAR]: '262.1 83.3% 57.8%',
      [RADIUS_VAR]: '1rem',
    },
    dark: {},
  },
  square: {
    light: {
      [BACKGROUND_VAR]: '50 16% 74%',
      [FOREGROUND_VAR]: '224 71.4% 4.1%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '224 71.4% 4.1%',
      [PRIMARY_VAR]: '262.1 83.3% 57.8%',
      [PRIMARY_FOREGROUND_VAR]: '210 20% 98%',
      [SECONDARY_VAR]: '220 14.3% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [MUTED_VAR]: '220 14.3% 95.9%',
      [MUTED_FOREGROUND_VAR]: '220 8.9% 46.1%',
      [ACCENT_VAR]: '220 14.3% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '220.9 39.3% 11%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 20% 98%',
      [BORDER_VAR]: '220 13% 91%',
      [INPUT_VAR]: '220 13% 91%',
      [RING_VAR]: '262.1 83.3% 57.8%',
      [RADIUS_VAR]: '0px',
    },
    dark: {},
  },
};

export default themes;
