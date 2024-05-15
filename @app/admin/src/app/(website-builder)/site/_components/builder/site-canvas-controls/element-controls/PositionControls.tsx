'use client';
import useStyles from '@admin/hooks/useStyles';
import { positionType } from '@cms/packages/tiglee-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';
import { Label } from '@cms/ui/components/Label';

const PositionControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('position');

  const handleOnChange = (value: string) => {
    applyStyles({ position: value });
  };

  return (
    <div>
      <Label htmlFor="elementPosition">Element Position</Label>
      <Select
        defaultValue="static"
        value={activeStyles?.position || 'static'}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="elementPosition" size="xs">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {positionType.map((item) => (
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

export default PositionControls;
