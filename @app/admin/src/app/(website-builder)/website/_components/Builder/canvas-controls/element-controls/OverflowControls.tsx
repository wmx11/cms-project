'use client';
import useStyles from '@admin/hooks/useStyles';
import { overflowType } from '@cms/template-engine/variants/variants';
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

  const handleOnChange = (value: string) => {
    applyStyles({ overflow: value });
  };

  return (
    <div>
      <Label htmlFor="overflowControls">Overflow</Label>
      <Select
        value={getActiveStyles('overflow')}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="overflowControls">
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
