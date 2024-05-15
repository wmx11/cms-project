'use client';
import useStyles from '@admin/hooks/useStyles';
import Input from '../../ui/Input';

const ZIndexControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'z-index': string }>('z-index');

  const handleOnChange = (value: string) => {
    applyStyles({ 'z-index': value });
  };

  return (
    <Input
      type="number"
      label="Z-index"
      value={activeStyles?.['z-index']}
      onChange={handleOnChange}
    />
  );
};

export default ZIndexControls;
