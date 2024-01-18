'use client';
import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { JssStyle } from 'jss';
import { useState } from 'react';
import UnitSelect from '../../../UnitSelect';
import ControlsWrapper from '../ControlsWrapper';

const HeightAndWidthControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const [unit, setUnit] = useState(DEFAULT_UNIT);

  const handleOnChange = (value: JssStyle) => {
    applyStyles(value);
  };

  return (
    <>
      <ControlsWrapper>
        {renderInputControlComponents(
          [
            'Width',
            'Height',
            'Max-width',
            'Max-height',
            'Min-width',
            'Min-height',
          ].map((item) => ({
            label: item,
            icon: (
              <UnitSelect className="mr-2" onChange={setUnit} value={unit} />
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
            onChange: (value) =>
              handleOnChange({ [item.toLowerCase()]: `${value}${unit}` }),
          }))
        )}
      </ControlsWrapper>
    </>
  );
};

export default HeightAndWidthControls;
