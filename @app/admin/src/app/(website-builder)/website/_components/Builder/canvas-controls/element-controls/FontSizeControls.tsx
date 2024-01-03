'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { fontSize } from '@cms/packages/template-engine/variants/variants';
import { ChevronDown } from '@cms/packages/ui/components/Icons';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import InputElement from '../InputElement';

import { Button } from '@cms/packages/ui/components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@cms/packages/ui/components/Select';
import ButtonElement from '../ButtonElement';

const FontSizeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    applyStyles({ fontSize: `${value}${DEFAULT_UNIT}` });
    renderTemplate(schema);
  };

  return (
    <div className="flex items-end w-full">
      <InputElement
        className="w-full"
        type="number"
        label="Font size"
        value={getActiveStyles('fontSize', DEFAULT_UNIT)}
        min={1}
        onChange={handleOnChange}
      />
      <Select
        onValueChange={handleOnChange}
        value={getActiveStyles('fontSize', DEFAULT_UNIT)}
      >
        <SelectTrigger className="border-none p-0 max-w-[38px]">
          <ButtonElement>
            <ChevronDown />
          </ButtonElement>
        </SelectTrigger>
        <SelectContent>
          {fontSize.map((item) => (
            <SelectItem value={item.toString()} key={item}>
              {item.toString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSizeControls;
