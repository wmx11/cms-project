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

export interface ThemeVariables {
  [BACKGROUND_VAR]?: string;
  [FOREGROUND_VAR]?: string;
  [CARD_VAR]?: string;
  [CARD_FOREGROUND_VAR]?: string;
  [POPOVER_VAR]?: string;
  [POPOVER_FOREGROUND_VAR]?: string;
  [PRIMARY_VAR]?: string;
  [PRIMARY_FOREGROUND_VAR]?: string;
  [SECONDARY_VAR]?: string;
  [SECONDARY_FOREGROUND_VAR]?: string;
  [MUTED_VAR]?: string;
  [MUTED_FOREGROUND_VAR]?: string;
  [ACCENT_VAR]?: string;
  [ACCENT_FOREGROUND_VAR]?: string;
  [DESTRUCTIVE_VAR]?: string;
  [DESTRUCTIVE_FOREGROUND_VAR]?: string;
  [BORDER_VAR]?: string;
  [INPUT_VAR]?: string;
  [RING_VAR]?: string;
  [RADIUS_VAR]?: string;
}

export type ThemeNames =
  | 'violet'
  | 'zinc'
  | 'rose'
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'synthwave';

export type ThemeTypes = 'light' | 'dark';

export type BuilderThemes = {
  [Key in ThemeNames]: {
    light: ThemeVariables;
    dark: ThemeVariables;
  };
};

const themes: BuilderThemes = {
  violet: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
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
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '224 71.4% 4.1%',
      [FOREGROUND_VAR]: '210 20% 98%',
      [CARD_VAR]: '224 71.4% 4.1%',
      [CARD_FOREGROUND_VAR]: '210 20% 98%',
      [POPOVER_VAR]: '224 71.4% 4.1%',
      [POPOVER_FOREGROUND_VAR]: '210 20% 98%',
      [PRIMARY_VAR]: '263.4 70% 50.4%',
      [PRIMARY_FOREGROUND_VAR]: '210 20% 98%',
      [SECONDARY_VAR]: '215 27.9% 16.9%',
      [SECONDARY_FOREGROUND_VAR]: '210 20% 98%',
      [MUTED_VAR]: '215 27.9% 16.9%',
      [MUTED_FOREGROUND_VAR]: '217.9 10.6% 64.9%',
      [ACCENT_VAR]: '215 27.9% 16.9%',
      [ACCENT_FOREGROUND_VAR]: '210 20% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 20% 98%',
      [BORDER_VAR]: '215 27.9% 16.9%',
      [INPUT_VAR]: '215 27.9% 16.9%',
      [RING_VAR]: '263.4 70% 50.4%',
    },
  },
  zinc: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '240 10% 3.9%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '240 10% 3.9%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '240 10% 3.9%',
      [PRIMARY_VAR]: '240 5.9% 10%',
      [PRIMARY_FOREGROUND_VAR]: '0 0% 98%',
      [SECONDARY_VAR]: '240 4.8% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '240 5.9% 10%',
      [MUTED_VAR]: '240 4.8% 95.9%',
      [MUTED_FOREGROUND_VAR]: '240 3.8% 46.1%',
      [ACCENT_VAR]: '240 4.8% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '240 5.9% 10%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 0% 98%',
      [BORDER_VAR]: '240 5.9% 90%',
      [INPUT_VAR]: '240 5.9% 90%',
      [RING_VAR]: '240 5.9% 10%',
      [RADIUS_VAR]: '0px',
    },
    dark: {
      [BACKGROUND_VAR]: '240 10% 3.9%',
      [FOREGROUND_VAR]: '0 0% 98%',
      [CARD_VAR]: '240 10% 3.9%',
      [CARD_FOREGROUND_VAR]: '0 0% 98%',
      [POPOVER_VAR]: '240 10% 3.9%',
      [POPOVER_FOREGROUND_VAR]: '0 0% 98%',
      [PRIMARY_VAR]: '0 0% 98%',
      [PRIMARY_FOREGROUND_VAR]: '240 5.9% 10%',
      [SECONDARY_VAR]: '240 3.7% 15.9%',
      [SECONDARY_FOREGROUND_VAR]: '0 0% 98%',
      [MUTED_VAR]: '240 3.7% 15.9%',
      [MUTED_FOREGROUND_VAR]: '240 5% 64.9%',
      [ACCENT_VAR]: '240 3.7% 15.9%',
      [ACCENT_FOREGROUND_VAR]: '0 0% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 0% 98%',
      [BORDER_VAR]: '240 3.7% 15.9%',
      [INPUT_VAR]: '240 3.7% 15.9%',
      [RING_VAR]: '240 4.9% 83.9%',
      [RADIUS_VAR]: '0px',
    },
  },
  rose: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '240 10% 3.9%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '240 10% 3.9%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '240 10% 3.9%',
      [PRIMARY_VAR]: '346.8 77.2% 49.8%',
      [PRIMARY_FOREGROUND_VAR]: '355.7 100% 97.3%',
      [SECONDARY_VAR]: '240 4.8% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '240 5.9% 10%',
      [MUTED_VAR]: '240 4.8% 95.9%',
      [MUTED_FOREGROUND_VAR]: '240 3.8% 46.1%',
      [ACCENT_VAR]: '240 4.8% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '240 5.9% 10%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 0% 98%',
      [BORDER_VAR]: '240 5.9% 90%',
      [INPUT_VAR]: '240 5.9% 90%',
      [RING_VAR]: '346.8 77.2% 49.8%',
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '20 14.3% 4.1%',
      [FOREGROUND_VAR]: '0 0% 95%',
      [CARD_VAR]: '24 9.8% 10%',
      [CARD_FOREGROUND_VAR]: '0 0% 95%',
      [POPOVER_VAR]: '0 0% 9%',
      [POPOVER_FOREGROUND_VAR]: '0 0% 95%',
      [PRIMARY_VAR]: '346.8 77.2% 49.8%',
      [PRIMARY_FOREGROUND_VAR]: '355.7 100% 97.3%',
      [SECONDARY_VAR]: '240 3.7% 15.9%',
      [SECONDARY_FOREGROUND_VAR]: '0 0% 98%',
      [MUTED_VAR]: '0 0% 15%',
      [MUTED_FOREGROUND_VAR]: '240 5% 64.9%',
      [ACCENT_VAR]: '12 6.5% 15.1%',
      [ACCENT_FOREGROUND_VAR]: '0 0% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 85.7% 97.3%',
      [BORDER_VAR]: '240 3.7% 15.9%',
      [INPUT_VAR]: '240 3.7% 15.9%',
      [RING_VAR]: '346.8 77.2% 49.8%',
    },
  },
  blue: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '222.2 84% 4.9%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '222.2 84% 4.9%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '222.2 84% 4.9%',
      [PRIMARY_VAR]: '221.2 83.2% 53.3%',
      [PRIMARY_FOREGROUND_VAR]: '210 40% 98%',
      [SECONDARY_VAR]: '210 40% 96.1%',
      [SECONDARY_FOREGROUND_VAR]: '222.2 47.4% 11.2%',
      [MUTED_VAR]: '210 40% 96.1%',
      [MUTED_FOREGROUND_VAR]: '215.4 16.3% 46.9%',
      [ACCENT_VAR]: '210 40% 96.1%',
      [ACCENT_FOREGROUND_VAR]: '222.2 47.4% 11.2%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 40% 98%',
      [BORDER_VAR]: '214.3 31.8% 91.4%',
      [INPUT_VAR]: '214.3 31.8% 91.4%',
      [RING_VAR]: '221.2 83.2% 53.3%',
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '222.2 84% 4.9%',
      [FOREGROUND_VAR]: '210 40% 98%',
      [CARD_VAR]: '222.2 84% 4.9%',
      [CARD_FOREGROUND_VAR]: '210 40% 98%',
      [POPOVER_VAR]: '222.2 84% 4.9%',
      [POPOVER_FOREGROUND_VAR]: '210 40% 98%',
      [PRIMARY_VAR]: '217.2 91.2% 59.8%',
      [PRIMARY_FOREGROUND_VAR]: '222.2 47.4% 11.2%',
      [SECONDARY_VAR]: '217.2 32.6% 17.5%',
      [SECONDARY_FOREGROUND_VAR]: '210 40% 98%',
      [MUTED_VAR]: '217.2 32.6% 17.5%',
      [MUTED_FOREGROUND_VAR]: '215 20.2% 65.1%',
      [ACCENT_VAR]: '217.2 32.6% 17.5%',
      [ACCENT_FOREGROUND_VAR]: '210 40% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '210 40% 98%',
      [BORDER_VAR]: '217.2 32.6% 17.5%',
      [INPUT_VAR]: '217.2 32.6% 17.5%',
      [RING_VAR]: '224.3 76.3% 48%',
    },
  },
  green: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '240 10% 3.9%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '240 10% 3.9%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '240 10% 3.9%',
      [PRIMARY_VAR]: '142.1 76.2% 36.3%',
      [PRIMARY_FOREGROUND_VAR]: '355.7 100% 97.3%',
      [SECONDARY_VAR]: '240 4.8% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '240 5.9% 10%',
      [MUTED_VAR]: '240 4.8% 95.9%',
      [MUTED_FOREGROUND_VAR]: '240 3.8% 46.1%',
      [ACCENT_VAR]: '240 4.8% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '240 5.9% 10%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 0% 98%',
      [BORDER_VAR]: '240 5.9% 90%',
      [INPUT_VAR]: '240 5.9% 90%',
      [RING_VAR]: '142.1 76.2% 36.3%',
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '20 14.3% 4.1%',
      [FOREGROUND_VAR]: '0 0% 95%',
      [CARD_VAR]: '24 9.8% 10%',
      [CARD_FOREGROUND_VAR]: '0 0% 95%',
      [POPOVER_VAR]: '0 0% 9%',
      [POPOVER_FOREGROUND_VAR]: '0 0% 95%',
      [PRIMARY_VAR]: '142.1 70.6% 45.3%',
      [PRIMARY_FOREGROUND_VAR]: '144.9 80.4% 10%',
      [SECONDARY_VAR]: '240 3.7% 15.9%',
      [SECONDARY_FOREGROUND_VAR]: '0 0% 98%',
      [MUTED_VAR]: '0 0% 15%',
      [MUTED_FOREGROUND_VAR]: '240 5% 64.9%',
      [ACCENT_VAR]: '12 6.5% 15.1%',
      [ACCENT_FOREGROUND_VAR]: '0 0% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '0 85.7% 97.3%',
      [BORDER_VAR]: '240 3.7% 15.9%',
      [INPUT_VAR]: '240 3.7% 15.9%',
      [RING_VAR]: '142.4 71.8% 29.2%',
    },
  },
  orange: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '20 14.3% 4.1%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '20 14.3% 4.1%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '20 14.3% 4.1%',
      [PRIMARY_VAR]: '24.6 95% 53.1%',
      [PRIMARY_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [SECONDARY_VAR]: '60 4.8% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '24 9.8% 10%',
      [MUTED_VAR]: '60 4.8% 95.9%',
      [MUTED_FOREGROUND_VAR]: '25 5.3% 44.7%',
      [ACCENT_VAR]: '60 4.8% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '24 9.8% 10%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [BORDER_VAR]: '20 5.9% 90%',
      [INPUT_VAR]: '20 5.9% 90%',
      [RING_VAR]: '24.6 95% 53.1%',
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '20 14.3% 4.1%',
      [FOREGROUND_VAR]: '60 9.1% 97.8%',
      [CARD_VAR]: '20 14.3% 4.1%',
      [CARD_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [POPOVER_VAR]: '20 14.3% 4.1%',
      [POPOVER_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [PRIMARY_VAR]: '20.5 90.2% 48.2%',
      [PRIMARY_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [SECONDARY_VAR]: '12 6.5% 15.1%',
      [SECONDARY_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [MUTED_VAR]: '12 6.5% 15.1%',
      [MUTED_FOREGROUND_VAR]: '24 5.4% 63.9%',
      [ACCENT_VAR]: '12 6.5% 15.1%',
      [ACCENT_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [DESTRUCTIVE_VAR]: '0 72.2% 50.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [BORDER_VAR]: '12 6.5% 15.1%',
      [INPUT_VAR]: '12 6.5% 15.1%',
      [RING_VAR]: '20.5 90.2% 48.2%',
    },
  },
  yellow: {
    light: {
      [BACKGROUND_VAR]: '0 0% 100%',
      [FOREGROUND_VAR]: '20 14.3% 4.1%',
      [CARD_VAR]: '0 0% 100%',
      [CARD_FOREGROUND_VAR]: '20 14.3% 4.1%',
      [POPOVER_VAR]: '0 0% 100%',
      [POPOVER_FOREGROUND_VAR]: '20 14.3% 4.1%',
      [PRIMARY_VAR]: '47.9 95.8% 53.1%',
      [PRIMARY_FOREGROUND_VAR]: '26 83.3% 14.1%',
      [SECONDARY_VAR]: '60 4.8% 95.9%',
      [SECONDARY_FOREGROUND_VAR]: '24 9.8% 10%',
      [MUTED_VAR]: '60 4.8% 95.9%',
      [MUTED_FOREGROUND_VAR]: '25 5.3% 44.7%',
      [ACCENT_VAR]: '60 4.8% 95.9%',
      [ACCENT_FOREGROUND_VAR]: '24 9.8% 10%',
      [DESTRUCTIVE_VAR]: '0 84.2% 60.2%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [BORDER_VAR]: '20 5.9% 90%',
      [INPUT_VAR]: '20 5.9% 90%',
      [RING_VAR]: '20 14.3% 4.1%',
      [RADIUS_VAR]: '16px',
    },
    dark: {
      [BACKGROUND_VAR]: '20 14.3% 4.1%',
      [FOREGROUND_VAR]: '60 9.1% 97.8%',
      [CARD_VAR]: '20 14.3% 4.1%',
      [CARD_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [POPOVER_VAR]: '20 14.3% 4.1%',
      [POPOVER_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [PRIMARY_VAR]: '47.9 95.8% 53.1%',
      [PRIMARY_FOREGROUND_VAR]: '26 83.3% 14.1%',
      [SECONDARY_VAR]: '12 6.5% 15.1%',
      [SECONDARY_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [MUTED_VAR]: '12 6.5% 15.1%',
      [MUTED_FOREGROUND_VAR]: '24 5.4% 63.9%',
      [ACCENT_VAR]: '12 6.5% 15.1%',
      [ACCENT_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '60 9.1% 97.8%',
      [BORDER_VAR]: '12 6.5% 15.1%',
      [INPUT_VAR]: '12 6.5% 15.1%',
      [RING_VAR]: '35.5 91.7% 32.9%',
    },
  },
  synthwave: {
    light: {
      [BACKGROUND_VAR]: '253 59% 20%',
      [FOREGROUND_VAR]: '260 60% 98%',
      [CARD_VAR]: '20 14.3% 4.1%',
      [CARD_FOREGROUND_VAR]: '260 60% 98%',
      [POPOVER_VAR]: '20 14.3% 4.1%',
      [POPOVER_FOREGROUND_VAR]: '260 60% 98%',
      [PRIMARY_VAR]: '253 58% 15%',
      [PRIMARY_FOREGROUND_VAR]: '260 60% 98%',
      [SECONDARY_VAR]: '253 58% 15%',
      [SECONDARY_FOREGROUND_VAR]: '260 60% 98%',
      [MUTED_VAR]: '253 58% 15%',
      [MUTED_FOREGROUND_VAR]: '24 5.4% 63.9%',
      [ACCENT_VAR]: '253 58% 15%',
      [ACCENT_FOREGROUND_VAR]: '260 60% 98%',
      [DESTRUCTIVE_VAR]: '0 62.8% 30.6%',
      [DESTRUCTIVE_FOREGROUND_VAR]: '260 60% 98%',
      [BORDER_VAR]: '253 58% 15%',
      [INPUT_VAR]: '253 58% 15%',
      [RING_VAR]: '35.5 91.7% 32.9%',
    },
    dark: {},
  },
};

export default themes;
