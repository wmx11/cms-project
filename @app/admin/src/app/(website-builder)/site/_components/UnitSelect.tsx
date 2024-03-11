import { FC, HTMLProps } from 'react';

interface UnitSelectProps
  extends Omit<HTMLProps<HTMLSelectElement>, 'onChange'> {
  onChange: (unit: string) => void;
}

const UnitSelect: FC<UnitSelectProps> = (props) => {
  return (
    <select {...props} onChange={(e) => props.onChange(e.target.value)}>
      <option value="px">px</option>
      <option value="%">%</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
      <option value="vh">vh</option>
      <option value="vw">vw</option>
    </select>
  );
};

export default UnitSelect;
