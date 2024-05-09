'use client';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT, GAP } from '@cms/packages/tiglee-engine/constants';
import { elementGaps } from '@cms/packages/tiglee-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';
import { Label } from '@cms/ui/components/Label';

const ElementsGapsControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ [GAP]: string }>(GAP);

  const handleOnChange = (value: string) => {
    applyStyles({
      [GAP]: `${value}${DEFAULT_UNIT}`,
      gap: `var(${GAP})`,
    });
  };

  return (
    <div>
      <Label htmlFor="gapSize">Gap size</Label>
      <Select
        value={activeStyles ? activeStyles[GAP]?.replace(DEFAULT_UNIT, '') : ''}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="gapSize">
          <SelectValue placeholder="Gap size" />
        </SelectTrigger>
        <SelectContent>
          {elementGaps.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {`${item} px`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ElementsGapsControls;
