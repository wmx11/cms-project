'use client';
import useStyles from '@admin/hooks/useStyles';
import Input from '../../ui/Input';
import { Blur, ICON_STYLES } from '@cms/ui/components/Icons';

const BlurControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('filter');

  const handleChange = (value: string) => {
    const newValue = `blur(${parseFloat(value)}px)`;
    applyStyles({ filter: newValue });
  };

  return (
    <div>
      <Input
        type="number"
        label="Blur"
        endContent={<Blur className={ICON_STYLES} />}
        value={activeStyles?.filter?.replace(/\D/g, '') || ''}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
};

export default BlurControls;
