'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { JssStyle } from 'jss';
import { useState } from 'react';
import UnitSelect from '../../../UnitSelect';
import ControlsWrapper from '../ControlsWrapper';

const PositionedElementControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const [unit, setUnit] = useState(DEFAULT_UNIT);
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: JssStyle) => {
    applyStyles(value);
    renderTemplate(schema);
  };

  return (
    <ControlsWrapper>
      {renderInputControlComponents(
        ['Top', 'Right', 'Bottom', 'Left', 'Inset'].map((item) => ({
          label: item,
          icon: item === 'Top' ? <UnitSelect onChange={setUnit} /> : unit,
          styleProp: item.toLowerCase(),
          value: getActiveStyles(item.toLowerCase(), unit),
          onChange: (value) => {
            handleOnChange({ [item.toLowerCase()]: `${value}${unit}` });
          },
        }))
      )}
    </ControlsWrapper>
  );
};

export default PositionedElementControls;
