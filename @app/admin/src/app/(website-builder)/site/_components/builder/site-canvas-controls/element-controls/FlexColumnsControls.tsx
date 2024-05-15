'use client';
import useStyles from '@admin/hooks/useStyles';
import {
  DEFAULT_UNIT,
  FLEX_COLUMNS,
  GAP,
  BASIS,
} from '@cms/packages/tiglee-engine/constants';
import { flexColumns } from '@cms/packages/tiglee-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';
import { Label } from '@cms/ui/components/Label';

const FlexColumnsControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{ [FLEX_COLUMNS]: string }>(
    FLEX_COLUMNS
  );

  const handleOnChange = (value: string) => {
    const columns = parseInt(value, 10);

    applyStyles({
      [FLEX_COLUMNS]: `${columns}`,
      [BASIS]: `calc(100% / var(${FLEX_COLUMNS}, 1))`,
      width: '100%',
      'flex-wrap': 'wrap',
      '&>*': {
        'flex-basis': `calc(var(${BASIS}, 100%) - var(${GAP}, 0${DEFAULT_UNIT}))`,
        'flex-grow': '1',
        'flex-shrink': '1',
      },
    });
  };

  return (
    <div>
      <Label htmlFor="columns">Columns</Label>
      <Select
        value={activeStyles ? activeStyles[FLEX_COLUMNS]?.toString() : ''}
        onValueChange={handleOnChange}
      >
        <SelectTrigger id="columns" size="xs">
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
