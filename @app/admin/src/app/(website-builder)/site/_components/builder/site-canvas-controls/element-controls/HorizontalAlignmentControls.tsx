'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/packages/ui/components/Icons';
import Button from '../../ui/buttons/Button';

const HorizontalAlignmentControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'justify-content': string }>(
    'justify-content'
  );

  const handleOnChange = (value: string) => {
    const _value = value === activeStyles?.['justify-content'] ? null : value;
    applyStyles({ 'justify-content': _value });
  };

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border gap-1">
      <Button
        variant={getActiveButtonVariant(
          'start',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignLeft />}
        onClick={() => handleOnChange('start')}
      >
        Left
      </Button>
      <Button
        variant={getActiveButtonVariant(
          'center',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignCenterHorizontal />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </Button>
      <Button
        variant={getActiveButtonVariant(
          'end',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignRight />}
        onClick={() => handleOnChange('end')}
      >
        Right
      </Button>
      <Button
        variant={getActiveButtonVariant(
          'space-between',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignBetween />}
        onClick={() => handleOnChange('space-between')}
      >
        Between
      </Button>
    </div>
  );
};

export default HorizontalAlignmentControls;
