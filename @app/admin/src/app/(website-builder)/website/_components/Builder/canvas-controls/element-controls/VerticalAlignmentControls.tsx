'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/packages/ui/components/Icons';
import Button from '../../ui/Button';

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
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border gap-1">
      <Button
        variant={getActiveButtonVariant('start', activeStyles?.['align-items'])}
        icon={<ItemsAlignTop />}
        onClick={() => handleOnChange('start')}
      >
        Top
      </Button>
      <Button
        variant={getActiveButtonVariant(
          'center',
          activeStyles?.['align-items']
        )}
        icon={<ItemsAlignCenterVertical />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </Button>
      <Button
        variant={getActiveButtonVariant('end', activeStyles?.['align-items'])}
        icon={<ItemsAlignBottom />}
        onClick={() => handleOnChange('end')}
      >
        Bottom
      </Button>
    </div>
  );
};

export default VerticalAlignmentControls;
