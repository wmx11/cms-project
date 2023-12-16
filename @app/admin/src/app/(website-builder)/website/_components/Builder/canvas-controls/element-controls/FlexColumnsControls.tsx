'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { flexColumns } from '@cms/template-engine/variants/variants';
import { Select, SelectItem } from '@nextui-org/react';

const FlexColumnsControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const columns = parseInt(value, 10);
    applyStyles({
      '--flex-columns': `${columns}`,
      '--basis': `${100 / columns}%`,
      width: '100%',
      'flex-wrap': 'wrap',
      '&>*': {
        'flex-basis': `calc(var(--basis, 100%) - var(--gap, 0${DEFAULT_UNIT}))`,
        'flex-grow': '1',
        'flex-shrink': '1',
      },
    });
    renderTemplate(schema);
  };

  return (
    <Select
      size="sm"
      radius="none"
      label="Columns"
      labelPlacement="outside"
      placeholder="Select the number of columns"
      selectedKeys={[getActiveStyles('--flex-columns')]}
      onChange={(e) => {
        handleOnChange(e.target.value);
      }}
    >
      {flexColumns.map((item) => (
        <SelectItem key={item} value={item}>
          {`${item} Columns`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FlexColumnsControls;
