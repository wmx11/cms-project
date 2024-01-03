export const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const horizontalAlign = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
};

export const verticalAlign = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
};

export const layoutType = {
  block: 'block',
  flex: 'flex',
  flexCol: 'flex flex-col',
};

export const positionType = [
  {
    value: 'fixed',
    label: 'Fixed',
    description:
      'The element is removed from the normal document flow and is positioned relative to the whole page.',
  },
  {
    value: 'static',
    label: 'Static',
    description: 'Default positioning of the element.',
  },
  {
    value: 'sticky',
    label: 'Sticky',
    description:
      'The element is positioned relative to the nearest scrolling block.',
  },
  {
    value: 'relative',
    label: 'Relative',
    description:
      'The element is positioned relative to itself. Use this when other elements inside are positioned absolute.',
  },
  {
    value: 'absolute',
    label: 'Absolute',
    description:
      'The element is removed from the normal document flow and positioned relative to its closest relative element.',
  },
];

export const flexColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const elementGaps = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

export const fontSize = [
  10, 11, 12, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128,
];
