export type BorderTypes =
  | 'border'
  | 'border-top'
  | 'border-right'
  | 'border-bottom'
  | 'border-left';

export type ShadowTypes = 'box-shadow' | 'text-shadow';

export interface ColorControlsProps {
  type: 'color' | 'background' | BorderTypes | ShadowTypes;
  label?: string;
  onChange: (value: string) => void;
}

export interface BackgroundControlsProps {
  attachment: string | null;
  color: string | null;
  image: string | null;
  position: string | null;
  repeat: string | null;
  size: string | null;
}

export type ShadowControlsProps = {
  label?: string;
} & ShadowTypes;
