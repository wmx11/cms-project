import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/ui/components/Icons';
import ButtonElement from '../ButtonElement';

const HorizontalAlignmentControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const { applyStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ 'justify-content': value });
    renderTemplate(schema);
  };

  return (
    <>
      <ButtonElement
        icon={<ItemsAlignLeft />}
        onClick={() => handleOnChange('start')}
      >
        Left
      </ButtonElement>
      <ButtonElement
        icon={<ItemsAlignCenterHorizontal />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        icon={<ItemsAlignRight />}
        onClick={() => handleOnChange('end')}
      >
        Right
      </ButtonElement>
      <ButtonElement
        icon={<ItemsAlignBetween />}
        onClick={() => handleOnChange('between')}
      >
        Between
      </ButtonElement>
    </>
  );
};

export default HorizontalAlignmentControls;
