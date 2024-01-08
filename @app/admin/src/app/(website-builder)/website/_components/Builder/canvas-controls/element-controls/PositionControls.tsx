'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { positionType } from '@cms/packages/template-engine/variants/variants';
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
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const shouldRender = applyStyles({ position: value });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <div>
      <Label htmlFor="elementPosition">Element Position</Label>
      <Select
        value={getActiveStyles('position')}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="elementPosition">
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
