'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { elementGaps } from '@cms/packages/template-engine/variants/variants';
import { Select, SelectItem } from '@nextui-org/select';

const ElementsGapsControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();
  const handleOnChange = (key: string) => {
    applyStyles({
      '--gap': `${key}${DEFAULT_UNIT}`,
      gap: 'var(--gap)',
    });
    renderTemplate(schema);
  };

  return (
    <Select
      size="sm"
      radius="none"
      label="Gaps"
      labelPlacement="outside"
      selectedKeys={[getActiveStyles('--gap', DEFAULT_UNIT)]}
      onChange={(e) => {
        handleOnChange(e.target.value);
      }}
    >
      {elementGaps.map((item) => (
        <SelectItem key={item} value={item}>
          {`${item}px`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ElementsGapsControls;
