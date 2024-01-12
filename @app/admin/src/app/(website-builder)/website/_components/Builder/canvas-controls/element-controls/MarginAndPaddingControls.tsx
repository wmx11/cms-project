'use client';
import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { JssStyle } from 'jss';
import { useState } from 'react';
import UnitSelect from '../../../UnitSelect';
import ControlsWrapper from '../ControlsWrapper';

const MarginAndPaddingControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();
  const [unit, setUnit] = useState(DEFAULT_UNIT);

  const handleOnChange = (value: JssStyle) => {
    applyStyles(value);
  };

  return (
    <ControlsWrapper>
      {renderInputControlComponents(
        [
          'Margin',
          'Margin-top',
          'Margin-bottom',
          'Margin-left',
          'Padding',
          'Padding-top',
          'Padding-bottom',
          'Padding-left',
        ].map((item) => ({
          label: item,
          icon:
            item === 'Margin' || item === 'Padding' ? (
              <UnitSelect className="mr-2" onChange={setUnit} />
            ) : (
              <span className="mr-2">{unit}</span>
            ),
          styleProp: item.toLowerCase(),
          value: getActiveStyles(item.toLowerCase(), unit),
          onChange: (value: string) =>
            handleOnChange({ [item.toLowerCase()]: `${value}${unit}` }),
        }))
      )}
    </ControlsWrapper>
  );
};

export default MarginAndPaddingControls;
