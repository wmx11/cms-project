import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/ui/components/Icons';
import ButtonElement from '../ButtonElement';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';

const VerticalAlignmentControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ 'align-items': value });
    renderTemplate(schema);
  };

  const activeStyle = getActiveStyles('align-items');

  return (
    <>
      <ButtonElement
        variant={getActiveButtonVariant('start', activeStyle)}
        icon={<ItemsAlignTop />}
        onClick={() => handleOnChange('start')}
      >
        Top
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('center', activeStyle)}
        icon={<ItemsAlignCenterVertical />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('end', activeStyle)}
        icon={<ItemsAlignBottom />}
        onClick={() => handleOnChange('end')}
      >
        Bottom
      </ButtonElement>
    </>
  );
};

export default VerticalAlignmentControls;
