'use client';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import UnitSelect from '../../../UnitSelect';
import useStyles from '@admin/hooks/useStyles';
import InputElement from '../InputElement';

const PositionedElementControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const [topValue, setTopValue] = useState('0');
  const [rightValue, setRightValue] = useState('0');
  const [bottomValue, setBottomValue] = useState('0');
  const [leftValue, setLeftValue] = useState('0');
  const [insetValue, setInsetValue] = useState('0');
  const [unit, setUnit] = useState(DEFAULT_UNIT);
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (styleProp: string, value: string) => {
    applyStyles({ [styleProp]: `${value}${unit}` });
    renderTemplate(schema);
  };

  return (
    <div className="flex [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full flex-wrap justify-between items-end gap-4">
      <InputElement
        label="Top"
        icon={<UnitSelect onChange={setUnit} />}
        value={getActiveStyles('top', unit)}
        onChange={(value) => {
          handleOnChange('top', value);
        }}
      />

      <InputElement
        label="Right"
        icon={unit}
        value={getActiveStyles('right', unit)}
        onChange={(value) => {
          handleOnChange('right', value);
        }}
      />

      <InputElement
        label="Bottom"
        icon={unit}
        value={getActiveStyles('bottom', unit)}
        onChange={(value) => {
          handleOnChange('bottom', value);
        }}
      />

      <InputElement
        label="Left"
        icon={unit}
        value={getActiveStyles('left', unit)}
        onChange={(value) => {
          handleOnChange('left', value);
        }}
      />

      <InputElement
        label="Inset"
        type="number"
        icon={unit}
        value={getActiveStyles('inset', unit)}
        onChange={(value) => {
          handleOnChange('inset', value);
        }}
      />
    </div>
  );
};

export default PositionedElementControls;
