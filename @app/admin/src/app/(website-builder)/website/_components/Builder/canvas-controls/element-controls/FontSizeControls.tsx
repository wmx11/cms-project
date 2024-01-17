'use client';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { fontSize } from '@cms/packages/template-engine/variants/variants';
import { ChevronDown } from '@cms/packages/ui/components/Icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@cms/packages/ui/components/Select';
import ButtonElement from '../ButtonElement';
import InputElement from '../InputElement';

const FontSizeControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'font-size': string }>('font-size');

  const handleOnChange = (value: string) => {
    applyStyles({
      'font-size': `${value}${DEFAULT_UNIT}`,
    });
  };

  return (
    <div className="flex gap-2 items-end">
      <div>
        <Select
          onValueChange={handleOnChange}
          value={activeStyles ? activeStyles['font-size'] : ''}
        >
          <SelectTrigger className="border-none p-0 max-w-[38px]">
            <ButtonElement>
              <ChevronDown />
            </ButtonElement>
          </SelectTrigger>
          <SelectContent>
            {fontSize.map((item) => (
              <SelectItem value={item.toString()} key={item}>
                {item.toString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <InputElement
          className="w-full"
          type="number"
          label="Font size"
          value={activeStyles ? parseFloat(activeStyles['font-size']) : ''}
          min={1}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default FontSizeControls;
