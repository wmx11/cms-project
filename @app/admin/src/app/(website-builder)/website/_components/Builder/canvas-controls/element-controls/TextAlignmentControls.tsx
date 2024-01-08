'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/packages/ui/components/Icons';
import ButtonElement from '../ButtonElement';

const TextAlignmentControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const shouldRender = applyStyles({ 'text-align': value });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  const activeStyle = getActiveStyles('text-align');

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
      <ButtonElement
        variant={getActiveButtonVariant('left', activeStyle)}
        icon={<TextAlignLeft />}
        onClick={() => handleOnChange('left')}
      >
        Left
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('center', activeStyle)}
        icon={<TextAlignCenter />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('right', activeStyle)}
        icon={<TextAlignRight />}
        onClick={() => handleOnChange('right')}
      >
        Right
      </ButtonElement>
    </div>
  );
};

export default TextAlignmentControls;
