'use client';
import useStyles from '@admin/hooks/useStyles';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/packages/ui/components/Icons';
import ButtonElement from '../ButtonElement';

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
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
      <ButtonElement
        variant={getActiveButtonVariant(
          'start',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignLeft />}
        onClick={() => handleOnChange('start')}
      >
        Left
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant(
          'center',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignCenterHorizontal />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant(
          'end',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignRight />}
        onClick={() => handleOnChange('end')}
      >
        Right
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant(
          'space-between',
          activeStyles?.['justify-content']
        )}
        icon={<ItemsAlignBetween />}
        onClick={() => handleOnChange('space-between')}
      >
        Between
      </ButtonElement>
    </div>
  );
};

export default HorizontalAlignmentControls;
