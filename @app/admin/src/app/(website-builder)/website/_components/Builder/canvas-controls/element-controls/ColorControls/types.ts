export interface ColorControlsProps {
  type: 'color' | 'background' | 'border-color' | 'text-shadow' | 'box-shadow';
  label?: string;
  onChange: (value: string) => void;
}
