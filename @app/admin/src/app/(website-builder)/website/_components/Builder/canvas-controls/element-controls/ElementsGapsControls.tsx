'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { elementGaps } from '@cms/packages/template-engine/variants/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';

const ElementsGapsControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();
  const handleOnChange = (value: string) => {
    applyStyles({
      '--gap': `${value}${DEFAULT_UNIT}`,
      gap: 'var(--gap)',
    });
    renderTemplate(schema);
  };

  return (
    <Select
      value={getActiveStyles('--gap', DEFAULT_UNIT)}
      onValueChange={handleOnChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Gap size" />
      </SelectTrigger>
      <SelectContent>
        {elementGaps.map((item) => (
          <SelectItem key={item} value={item.toString()}>
            {`${item} px`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ElementsGapsControls;
