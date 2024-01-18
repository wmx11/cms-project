export interface BorderTypes {
  type:
    | 'border'
    | 'border-top'
    | 'border-right'
    | 'border-bottom'
    | 'border-left';
}

export interface ShadowTypes {
  type: 'box-shadow' | 'text-shadow';
}

export interface ColorControlsProps {
  type: 'color' | 'background' | BorderTypes['type'] | ShadowTypes['type'];
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

export interface ShadowControlsProps extends ShadowTypes {
  label?: string;
}
