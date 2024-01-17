'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/packages/ui/components/Icons';
import ButtonElement from '../ButtonElement';

const TextAlignmentControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'text-align': string }>('text-align');

  const handleOnChange = (value: string) => {
    const _value = value === activeStyles?.['text-align'] ? null : value;
    applyStyles({ 'text-align': _value });
  };

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
      <ButtonElement
        variant={getActiveButtonVariant('left', activeStyles?.['text-align'])}
        icon={<TextAlignLeft />}
        onClick={() => handleOnChange('left')}
      >
        Left
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('center', activeStyles?.['text-align'])}
        icon={<TextAlignCenter />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('right', activeStyles?.['text-align'])}
        icon={<TextAlignRight />}
        onClick={() => handleOnChange('right')}
      >
        Right
      </ButtonElement>
    </div>
  );
};

export default TextAlignmentControls;
