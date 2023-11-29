'use client';
import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import { fontSize } from '@cms/template-engine/variants/variants';
import { ChevronDown } from '@cms/ui/components/Icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import { useState } from 'react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';

const FontSizeControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate, styles, setStyles, styleSheet } =
    useBuilderProviderState();

  const component = traverseComponentsTree({ path, schema });

  const [value, setValue] = useState(
    component?.componentVariants?.fontSize?.toString() || '14'
  );

  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);

  const handleOnChange = (key: string) => {
    const copySchema = [...schema];
    const component = traverseComponentsTree({ path, schema: copySchema });
    const componentClassName = component?.props.find(
      (item) => item.name === 'className'
    );

    if (!componentClassName) {
      return;
    }

    setValue(key as string);

    styleSheet?.replaceRule(path, { fontSize: `${key}px` });

    componentClassName.value = styleSheet?.classes[path] || '';

    renderTemplate(copySchema);
  };

  return (
    <div className="flex items-end">
      <Input
        size="sm"
        radius="none"
        type="number"
        label="Font size"
        labelPlacement="outside"
        fullWidth
        value={value}
        min={1}
        onValueChange={(key) => {
          handleOnChange(key);
        }}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            radius="none"
            size="sm"
            startContent={<ChevronDown />}
          ></Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with description"
          onAction={(key) => {
            setValue(key as string);
            applyVariant({
              path,
              schema,
              variant: {
                fontSize: key as keyof typeof fontSize,
              },
            });
          }}
        >
          {Object.keys(fontSize).map((item) => (
            <DropdownItem key={item}>{item.toString()}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FontSizeControls;
