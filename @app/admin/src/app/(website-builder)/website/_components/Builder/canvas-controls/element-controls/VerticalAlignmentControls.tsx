'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/packages/ui/components/Icons';
import ButtonElement from '../ButtonElement';

const VerticalAlignmentControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'align-items': string }>(
    'align-items'
  );

  const handleOnChange = (value: string) => {
    const _value = value === activeStyles?.['align-items'] ? null : value;
    applyStyles({ 'align-items': _value });
  };

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
      <ButtonElement
        variant={getActiveButtonVariant('start', activeStyles?.['align-items'])}
        icon={<ItemsAlignTop />}
        onClick={() => handleOnChange('start')}
      >
        Top
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant(
          'center',
          activeStyles?.['align-items']
        )}
        icon={<ItemsAlignCenterVertical />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('end', activeStyles?.['align-items'])}
        icon={<ItemsAlignBottom />}
        onClick={() => handleOnChange('end')}
      >
        Bottom
      </ButtonElement>
    </div>
  );
};

export default VerticalAlignmentControls;
