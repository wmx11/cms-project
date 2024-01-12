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

  const handleOnChange = (value: string) => {
    applyStyles({ 'justify-content': value });
  };

  const activeStyle = getActiveStyles('justify-content');

  return (
    <div className="flex flex-wrap [&>*]:flex-1 [&>*]:border">
      <ButtonElement
        variant={getActiveButtonVariant('start', activeStyle)}
        icon={<ItemsAlignLeft />}
        onClick={() => handleOnChange('start')}
      >
        Left
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('center', activeStyle)}
        icon={<ItemsAlignCenterHorizontal />}
        onClick={() => handleOnChange('center')}
      >
        Center
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('end', activeStyle)}
        icon={<ItemsAlignRight />}
        onClick={() => handleOnChange('end')}
      >
        Right
      </ButtonElement>
      <ButtonElement
        variant={getActiveButtonVariant('between', activeStyle)}
        icon={<ItemsAlignBetween />}
        onClick={() => handleOnChange('between')}
      >
        Between
      </ButtonElement>
    </div>
  );
};

export default HorizontalAlignmentControls;
