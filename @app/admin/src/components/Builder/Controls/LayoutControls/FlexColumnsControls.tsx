import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import { ItemsAlignLeft } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import { ComponentVariants } from '@cms/template-engine/types';

const FlexColumnsControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  return (
    <>
      {Array(12)
        .fill(null)
        .map((item, index) => (
          <Button
            key={`flex_column_controls_${index}`}
            variant="light"
            color="secondary"
            radius="none"
            startContent={<ItemsAlignLeft />}
            onClick={() =>
              applyVariant({
                path,
                schema,
                variant: {
                  flexColumns: (index +
                    1) as keyof ComponentVariants['flexColumns'],
                },
              })
            }
          >
            {index + 1}
          </Button>
        ))}
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { flexColumns: 1 },
          })
        }
      >
        1
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { flexColumns: 2 },
          })
        }
      >
        2
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { flexColumns: 3 },
          })
        }
      >
        3
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { flexColumns: 4 },
          })
        }
      >
        4
      </Button>
    </>
  );
};

export default FlexColumnsControls;
