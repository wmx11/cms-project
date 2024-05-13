'use client';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/tiglee-engine/constants';
import { fontSize } from '@cms/packages/tiglee-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@cms/packages/ui/components/Select';
import Input from '../../ui/Input';

const FontSizeControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ 'font-size': string }>('font-size');

  const handleOnChange = (value: string) => {
    applyStyles({
      'font-size': `${value}${DEFAULT_UNIT}`,
    });
  };

  return (
    <div className="flex items-end gap-2">
      <div>
        <Select
          onValueChange={handleOnChange}
          value={activeStyles ? activeStyles['font-size'] : ''}
        >
          <SelectTrigger className="bg-secondary m-0 h-8 rounded-md px-2 py-2 text-xs"></SelectTrigger>
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
        <Input
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
