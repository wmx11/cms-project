'use client';
import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { Eye, ICON_STYLES } from '@cms/ui/components/Icons';
import React from 'react';

const OpacityControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('opacity');

  const handleOnChange = (value: string) => {
    applyStyles({ opacity: value });
  };

  return (
    <div>
      {renderInputControlComponents([
        {
          label: 'Opacity',
          styleProp: 'opacity',
          value: activeStyles?.opacity || '1',
          icon: <Eye className={ICON_STYLES} />,
          min: 0,
          max: 1,
          step: 0.1,
          onChange: handleOnChange,
        },
      ])}
    </div>
  );
};

export default OpacityControls;
