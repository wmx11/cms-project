export interface ColorControlsProps {
  type: 'color' | 'background' | 'border-color' | 'text-shadow' | 'box-shadow';
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
