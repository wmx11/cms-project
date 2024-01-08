'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { flexColumns } from '@cms/packages/template-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';
import { Label } from '@cms/ui/components/Label';

const FlexColumnsControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const columns = parseInt(value, 10);
    const shouldRender = applyStyles({
      '--flex-columns': `${columns}`,
      '--basis': `calc(100% / var(--flex-columns, 1))`,
      width: '100%',
      'flex-wrap': 'wrap',
      '&>*': {
        'flex-basis': `calc(var(--basis, 100%) - var(--gap, 0${DEFAULT_UNIT}))`,
        'flex-grow': '1',
        'flex-shrink': '1',
      },
    });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <div>
      <Label htmlFor="columns">Columns</Label>
      <Select
        value={getActiveStyles('--flex-columns')}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="columns">
          <SelectValue placeholder="Columns" />
        </SelectTrigger>
        <SelectContent>
          {flexColumns.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {`${item} columns`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FlexColumnsControls;
