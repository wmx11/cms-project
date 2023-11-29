'use client';
import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import { flexColumns } from '@cms/template-engine/variants/variants';
import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';

const FlexColumnsControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const component = traverseComponentsTree({ path, schema });

  const [value, setValue] = useState(
    `col_${component?.componentVariants?.flexColumns}`
  );

  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);

  return (
    <Select
      size="sm"
      radius="none"
      label="Columns"
      labelPlacement='outside'
      placeholder="Select the number of columns"
      selectedKeys={[value]}
      onChange={(e) => {
        setValue(e.target.value);
        applyVariant({
          path,
          schema,
          variant: {
            flexColumns: e.target.value
              .split('_')
              .at(-1) as unknown as keyof typeof flexColumns,
          },
        });
      }}
    >
      {Object.keys(flexColumns).map((item) => (
        <SelectItem key={`col_${item}`} value={`col_${item}`}>
          {`${item} Columns`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FlexColumnsControls;
