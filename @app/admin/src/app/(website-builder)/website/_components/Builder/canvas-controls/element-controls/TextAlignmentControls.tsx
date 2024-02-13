'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/packages/ui/components/Icons';
import Button from '../../ui/buttons/Button';

const TextAlignmentControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'text-align': string }>('text-align');

  const handleOnChange = (value: string) => {
    const _value = value === activeStyles?.['text-align'] ? null : value;
    applyStyles({ 'text-align': _value });
  };

  return (
    <div className="flex flex-wrap [&>*]:flex-1 gap-1">
      <Button
        variant={getActiveButtonVariant('left', activeStyles?.['text-align'])}
        icon={<TextAlignLeft />}
        onClick={() => handleOnChange('left')}
      >
        Left
      </Button>
      <Button
        variant={getActiveButtonVariant('center', activeStyles?.['text-align'])}
        icon={<TextAlignCenter />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </Button>
      <Button
        variant={getActiveButtonVariant('right', activeStyles?.['text-align'])}
        icon={<TextAlignRight />}
        onClick={() => handleOnChange('right')}
      >
        Right
      </Button>
    </div>
  );
};

export default TextAlignmentControls;
