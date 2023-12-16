'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { positionType } from '@cms/template-engine/variants/variants';
import { Select, SelectItem } from '@nextui-org/react';

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
        size="sm"
        radius="none"
        label="Position"
        labelPlacement="outside"
        selectedKeys={[getActiveStyles('position') || 'static']}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      >
        {positionType.map((item) => (
          <SelectItem className="capitalize" key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default PositionControls;
