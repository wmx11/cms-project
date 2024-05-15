'use client';
import useStyles from '@admin/hooks/useStyles';
import { LAYOUT_TYPE } from '@cms/packages/tiglee-engine/constants';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';

const layoutTypes = {
  none: { [LAYOUT_TYPE]: 'none', display: 'none' },
  block: { [LAYOUT_TYPE]: 'block', display: 'block' },
  inline: { [LAYOUT_TYPE]: 'inline', display: 'inline' },
  'flex-row': {
    [LAYOUT_TYPE]: 'flex-row',
    display: 'flex',
    'flex-direction': 'row',
  },
  'flex-column': {
    [LAYOUT_TYPE]: 'flex-column',
    display: 'flex',
    'flex-direction': 'column',
  },
  'row-reverse': {
    [LAYOUT_TYPE]: 'row-reverse',
    display: 'flex',
    'flex-direction': 'row-reverse',
  },
  'column-reverse': {
    [LAYOUT_TYPE]: 'column-reverse',
    display: 'flex',
    'flex-direction': 'column-reverse',
  },
};

const LayoutTypeControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ [LAYOUT_TYPE]: string }>(LAYOUT_TYPE);

  const handleOnChange = (value: string) => {
    applyStyles(layoutTypes[value as keyof typeof layoutTypes]);
  };

  return (
    <div>
      <Label htmlFor="elementLayoutType">Element Layout Type</Label>
      <Select
        defaultValue="block"
        value={activeStyles?.[LAYOUT_TYPE] || 'block'}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="elementLayoutType" size="xs">
          <SelectValue placeholder="Element Layout Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            <SelectItemWithDescription
              label="None"
              description="The selected element will not be displayed and will be hidden"
            />
          </SelectItem>
          <SelectItem value="block">
            <SelectItemWithDescription
              label="Block"
              description="The selected element will be displayed as a block"
            />
          </SelectItem>
          <SelectItem value="inline">
            <SelectItemWithDescription
              label="Inline"
              description="The selected element will be displayed as an inline element"
            />
          </SelectItem>
          <SelectItem value="flex-row">
            <SelectItemWithDescription
              label="Flex Row"
              description="The selected element will have its children displayed in a row"
            />
          </SelectItem>
          <SelectItem value="flex-column">
            <SelectItemWithDescription
              label="Flex Column"
              description="The selected element will have its children displayed in a column"
            />
          </SelectItem>
          <SelectItem value="row-reverse">
            <SelectItemWithDescription
              label="Flex Row Reverse"
              description="The selected element will have its children displayed in a reversed row"
            />
          </SelectItem>
          <SelectItem value="column-reverse">
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
