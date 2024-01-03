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
    applyStyles({ textAlign: value });
    renderTemplate(schema);
  };

  const activeStyle = getActiveStyles('textAlign');

  return (
    <div className="flex gap-4 space-between flex-wrap">
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
