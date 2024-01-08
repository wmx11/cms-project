'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';

const LayoutTypeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: Record<string, string>) => {
    const shouldRender = applyStyles(value);

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <div>
      <Label htmlFor="elementLayoutType">Element Layout Type</Label>
      <Select
        value={getActiveStyles('--layout-type')}
        onValueChange={(value) => {
          handleOnChange(JSON.parse(value));
        }}
      >
        <SelectTrigger id="elementLayoutType">
          <SelectValue placeholder="Element Layout Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='{ "--layout-type": "block", "display": "block" }'>
            <SelectItemWithDescription
              label="Block"
              description="The selected element will be displayed as a block"
            />
          </SelectItem>
          <SelectItem value='{ "--layout-type": "inline", "display": "inline" }'>
            <SelectItemWithDescription
              label="Inline"
              description="The selected element will be displayed as an inline element"
            />
          </SelectItem>
          <SelectItem value='{ "--layout-type": "flex-row", "display": "flex", "flex-direction": "row" }'>
            <SelectItemWithDescription
              label="Flex Row"
              description="The selected element will have its children displayed in a row"
            />
          </SelectItem>
          <SelectItem value='{ "--layout-type": "flex-column", "display": "flex", "flex-direction": "column" }'>
            <SelectItemWithDescription
              label="Flex Column"
              description="The selected element will have its children displayed in a column"
            />
          </SelectItem>
          <SelectItem value='{ "--layout-type": "flex-row-reverse", "display": "flex", "flex-direction": "row-reverse" }'>
            <SelectItemWithDescription
              label="Flex Row Reverse"
              description="The selected element will have its children displayed in a reversed row"
            />
          </SelectItem>
          <SelectItem value='{ "--layout-type": "flex-column-reverse", "display": "flex", "flex-direction": "column-reverse" }'>
            <SelectItemWithDescription
              label="Flex Column Reverse"
              description="The selected element will have its children displayed in a reversed column"
            />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LayoutTypeControls;
