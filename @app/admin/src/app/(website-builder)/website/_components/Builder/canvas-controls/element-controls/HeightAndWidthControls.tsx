'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { useState } from 'react';
import UnitSelect from '../../../UnitSelect';
import InputElement from '../InputElement';

const HeightAndWidthControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles } = useStyles();

  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const [minWidth, setMinWidth] = useState('0');
  const [minHeight, setMinHeight] = useState('0');
  const [maxWidth, setMaxWidth] = useState('0');
  const [maxHeight, setMaxHeight] = useState('0');
  const [unit, setUnit] = useState(DEFAULT_UNIT);

  const handleOnChange = (
    styleProp: string,
    value: string,
    setValue: (value: string) => void
  ) => {
    setValue(value);
    applyStyles({ [styleProp]: `${value}${unit}` });
    renderTemplate(schema);
  };

  return (
    <div className="flex [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full flex-wrap justify-between items-end gap-4">
      <InputElement
        label="Width"
        type="number"
        value={width}
        icon={<UnitSelect onChange={setUnit} />}
        onChange={(value) => handleOnChange('width', value, setWidth)}
      />

      <InputElement
        label="Height"
        type="number"
        value={height}
        icon={unit}
        onChange={(value) => handleOnChange('height', value, setHeight)}
      />

      <InputElement
        label="Min-width"
        type="number"
        value={minWidth}
        icon={unit}
        onChange={(value) => handleOnChange('min-width', value, setMinWidth)}
      />

      <InputElement
        label="Min-height"
        type="number"
        value={minHeight}
        icon={unit}
        onChange={(value) => handleOnChange('min-height', value, setMinHeight)}
      />

      <InputElement
        label="Max-width"
        type="number"
        value={maxWidth}
        icon={unit}
        onChange={(value) => handleOnChange('max-width', value, setMaxWidth)}
      />

      <InputElement
        label="Max-height"
        type="number"
        value={maxHeight}
        icon={unit}
        onChange={(value) => handleOnChange('max-height', value, setMaxHeight)}
      />
    </div>
  );
};

export default HeightAndWidthControls;
