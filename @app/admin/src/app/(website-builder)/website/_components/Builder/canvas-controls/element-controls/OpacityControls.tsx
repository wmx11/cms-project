import useStyles from '@admin/hooks/useStyles';
import { renderInputControlComponents } from '@admin/utils/renderControlComponents';
import { Eye } from '@cms/ui/components/Icons';
import React from 'react';

const OpacityControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ opacity: value });
  };

  return (
    <div>
      {renderInputControlComponents([
        {
          label: 'Opacity',
          styleProp: 'opacity',
          value: getActiveStyles('opacity'),
          icon: <Eye className="mr-2" />,
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
