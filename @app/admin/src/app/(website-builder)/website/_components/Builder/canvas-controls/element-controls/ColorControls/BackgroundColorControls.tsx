'use client';
import useStyles from '@admin/hooks/useStyles';
import ColorControls from '.';
import { initialBackgroundState } from './ColorControls';

const BackgroundColorControls = () => {
  const { applyStyles } = useStyles();

  const handleChange = (value: string) => {
    applyStyles({
      background: {
        ...initialBackgroundState,
        color: value,
      },
    });
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
