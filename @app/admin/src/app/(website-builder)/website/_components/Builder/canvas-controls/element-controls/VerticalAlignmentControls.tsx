import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/packages/ui/components/Icons';
import ButtonElement from '../ButtonElement';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';

const VerticalAlignmentControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();

  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const shouldRender = applyStyles({ 'align-items': value });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  const activeStyle = getActiveStyles('align-items');

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
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
    </div>
  );
};

export default VerticalAlignmentControls;
