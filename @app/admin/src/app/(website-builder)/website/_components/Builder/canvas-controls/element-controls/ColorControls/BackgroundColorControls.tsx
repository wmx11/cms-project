'use client';
import useStyles from '@admin/hooks/useStyles';
import ColorControls from '.';

const BackgroundColorControls = () => {
  const { applyStyles } = useStyles();

  const handleChange = (value: string) => {
    applyStyles({ background: value });
  };

  return (
    <ColorControls
      onChange={handleChange}
      label="Background color"
      type="background"
    />
  );
};

export default BackgroundColorControls;
