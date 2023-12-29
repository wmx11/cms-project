'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { fontSize } from '@cms/packages/template-engine/variants/variants';
import { ChevronDown } from '@cms/packages/ui/components/Icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import InputElement from '../InputElement';

const FontSizeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ fontSize: `${value}${DEFAULT_UNIT}` });
    renderTemplate(schema);
  };

  return (
    <div className="flex items-end">
      <InputElement
        type="number"
        label="Font size"
        value={getActiveStyles('fontSize', DEFAULT_UNIT)}
        min={1}
        onChange={handleOnChange}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="sm"
            radius="none"
            startContent={<ChevronDown />}
          ></Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(value) => {
            handleOnChange(value as string);
          }}
        >
          {fontSize.map((item) => (
            <DropdownItem key={item}>{item.toString()}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FontSizeControls;
