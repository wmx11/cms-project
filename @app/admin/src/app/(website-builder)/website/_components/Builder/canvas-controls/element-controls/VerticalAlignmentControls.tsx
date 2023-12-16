import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/ui/components/Icons';
import ButtonElement from '../ButtonElement';

const VerticalAlignmentControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const { applyStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ 'align-items': value });
    renderTemplate(schema);
  };

  return (
    <>
      <ButtonElement
        icon={<ItemsAlignTop />}
        onClick={() => handleOnChange('start')}
      >
        Top
      </ButtonElement>
      <ButtonElement
        icon={<ItemsAlignCenterVertical />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        icon={<ItemsAlignBottom />}
        onClick={() => handleOnChange('end')}
      >
        Bottom
      </ButtonElement>
    </>
  );
};

export default VerticalAlignmentControls;
