'use client';
import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { DEFAULT_UNIT } from '@cms/packages/tiglee-engine/constants';
import { JssStyle } from 'jss';
import { useState } from 'react';
import UnitSelect from '../../../UnitSelect';
import ControlsWrapper from '../ControlsWrapper';

const PositionedElementControls = () => {
  const [unit, setUnit] = useState(DEFAULT_UNIT);
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: JssStyle) => {
    applyStyles(value);
  };

  return (
    <ControlsWrapper>
      {renderInputControlComponents(
        ['Top', 'Right', 'Bottom', 'Left', 'Inset'].map((item) => ({
          label: item,
          icon:
            item === 'Top' ? (
              <UnitSelect className="mr-2" onChange={setUnit} />
            ) : (
              <span className="mr-2">{unit}</span>
            ),
          styleProp: item.toLowerCase(),
          value: (() => {
            const activeStyles = getActiveStyles<{ [k: string]: string }>(
              item.toLowerCase()
            );

            if (!activeStyles) {
              return '';
            }

            return activeStyles[item.toLowerCase()]?.replace(unit, '');
          })(),
          onChange: (value) => {
            handleOnChange({ [item.toLowerCase()]: `${value}${unit}` });
          },
        }))
      )}
    </ControlsWrapper>
  );
};

export default PositionedElementControls;
