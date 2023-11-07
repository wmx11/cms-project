import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';

const HorizontalAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  return (
    <>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { horizontalAlign: 'left' },
          })
        }
      >
        Left
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignCenterHorizontal />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { horizontalAlign: 'center' },
          })
        }
      >
        Center
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignRight />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { horizontalAlign: 'right' },
          })
        }
      >
        Right
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignBetween />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { horizontalAlign: 'between' },
          })
        }
      >
        Between
      </Button>
    </>
  );
};

export default HorizontalAlignmentControls;
