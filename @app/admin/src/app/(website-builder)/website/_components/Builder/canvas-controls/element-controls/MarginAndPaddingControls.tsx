'use client';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import UnitSelect from '../../../UnitSelect';
import useStyles from '@admin/hooks/useStyles';

const MarginAndPaddingControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles } = useStyles();

  const [margin, setMargin] = useState('0');
  const [marginTop, setMarginTop] = useState('0');
  const [marginRight, setMarginRight] = useState('0');
  const [marginBottom, setMarginBottom] = useState('0');
  const [marginLeft, setMarginLeft] = useState('0');

  const [padding, setPadding] = useState('0');
  const [paddingTop, setPaddingTop] = useState('0');
  const [paddingRight, setPaddingRight] = useState('0');
  const [paddingBottom, setPaddingBottom] = useState('0');
  const [paddingLeft, setPaddingLeft] = useState('0');

  const [unit, setUnit] = useState(DEFAULT_UNIT);

  const handleOnChange = (
    styleProp: string,
    value: string,
    setValue: (value: string) => void
  ) => {
    setValue(value);
    applyStyles({ styleProp, value, unit });
    renderTemplate(schema);
  };

  return (
    <div className="flex [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full flex-wrap justify-between items-end gap-4">
      <Input
        size="sm"
        radius="none"
        label="Margin"
        labelPlacement="outside"
        fullWidth
        type="number"
        endContent={<UnitSelect onChange={setUnit} />}
        value={margin}
        onValueChange={(value) => {
          handleOnChange('margin', value, setMargin);
        }}
      />
      <Input
        size="sm"
        radius="none"
        label="Margin-top"
        labelPlacement="outside"
        fullWidth
        type="number"
        endContent={unit}
        value={marginTop}
        onValueChange={(value) => {
          handleOnChange('margin-top', value, setMarginTop);
        }}
      />
      <Input
        size="sm"
        radius="none"
        label="Margin-right"
        labelPlacement="outside"
        fullWidth
        type="number"
        endContent={unit}
        value={marginRight}
        onValueChange={(value) => {
          handleOnChange('margin-right', value, setMarginRight);
        }}
      />
      <Input
        size="sm"
        radius="none"
        label="Margin-bottom"
        labelPlacement="outside"
        fullWidth
        type="number"
        endContent={unit}
        value={marginBottom}
        onValueChange={(value) => {
          handleOnChange('margin-bottom', value, setMarginBottom);
        }}
      />
      <Input
        size="sm"
        radius="none"
        label="Margin-left"
        labelPlacement="outside"
        fullWidth
        type="number"
        endContent={unit}
        value={marginLeft}
        onValueChange={(value) => {
          handleOnChange('margin-left', value, setMarginLeft);
        }}
      />
    </div>
  );
};

export default MarginAndPaddingControls;
