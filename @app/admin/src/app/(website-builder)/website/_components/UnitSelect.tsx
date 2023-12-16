import React, { FC } from 'react';

type UnitSelectProps = {
  onChange: (unit: string) => void;
};

const UnitSelect: FC<UnitSelectProps> = ({ onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value=""></option>
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
