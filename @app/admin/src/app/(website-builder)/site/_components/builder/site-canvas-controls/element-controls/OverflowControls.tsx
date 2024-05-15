'use client';
import useStyles from '@admin/hooks/useStyles';
import { overflowType } from '@cms/packages/tiglee-engine/variants/variants';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';

const OverflowControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('overflow');

  const handleOnChange = (value: string) => {
    applyStyles({ overflow: value });
  };

  return (
    <div>
      <Label htmlFor="overflowControls">Overflow</Label>
      <Select value={activeStyles?.overflow} onValueChange={handleOnChange}>
        <SelectTrigger id="overflowControls" size="xs">
          <SelectValue placeholder="Overflow type" />
        </SelectTrigger>
        <SelectContent>
          {overflowType.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemWithDescription
                label={item.label}
                description={item.description}
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OverflowControls;
