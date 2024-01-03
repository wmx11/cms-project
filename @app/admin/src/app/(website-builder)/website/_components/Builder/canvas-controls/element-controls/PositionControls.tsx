'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { positionType } from '@cms/packages/template-engine/variants/variants';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@cms/packages/ui/components/Select';

const PositionControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();
  const handleOnChange = (value: string) => {
    applyStyles({ position: value });
    renderTemplate(schema);
  };

  return (
    <div>
      <Select
        value={getActiveStyles('position')}
        onValueChange={handleOnChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {positionType.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className='text-left'>
                <div>{item.label}</div>
                <div className="text-xs max-w-[200px]">{item.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PositionControls;
