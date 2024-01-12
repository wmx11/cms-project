'use client';
import useStyles from '@admin/hooks/useStyles';
import InputElement from '../InputElement';

const ZIndexControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ 'z-index': value });
  };

  return (
    <InputElement
      type="number"
      label="Z-index"
      value={getActiveStyles('z-index')}
      onChange={handleOnChange}
    />
  );
};

export default ZIndexControls;
