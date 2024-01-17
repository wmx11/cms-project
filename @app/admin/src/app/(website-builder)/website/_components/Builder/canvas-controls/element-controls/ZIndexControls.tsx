'use client';
import useStyles from '@admin/hooks/useStyles';
import InputElement from '../InputElement';

const ZIndexControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'z-index': string }>('z-index');

  const handleOnChange = (value: string) => {
    applyStyles({ 'z-index': value });
  };

  return (
    <InputElement
      type="number"
      label="Z-index"
      value={activeStyles?.['z-index']}
      onChange={handleOnChange}
    />
  );
};

export default ZIndexControls;
