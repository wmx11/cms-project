'use client';
import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import { elementGaps } from '@cms/template-engine/variants/variants';
import { Select, SelectItem } from '@nextui-org/select';
import { useState } from 'react';
import useBuilderProviderState from '../../../../../../../hooks/useBuilderProviderState';

const ElementsGapsControls = () => {
  const {
    schema,
    selectedComponent,
    selectedComonentPath: path,
    renderTemplate,
  } = useBuilderProviderState();

  const [value, setValue] = useState(
    `gap_${selectedComponent?.componentVariants?.elementGaps}`
  );

  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);

  return (
    <Select
      size="sm"
      radius="none"
      label="Gaps"
      labelPlacement="outside"
      selectedKeys={[value]}
      onChange={(e) => {
        setValue(e.target.value);
        applyVariant({
          path,
          schema,
          variant: {
            elementGaps: e.target.value
              .split('_')
              .at(-1) as unknown as keyof typeof elementGaps,
          },
        });
      }}
    >
      {Object.keys(elementGaps).map((item) => (
        <SelectItem key={`gap_${item}`} value={`gap_${item}`}>
          {`${(item as unknown as number) * 4}px Gap`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ElementsGapsControls;
