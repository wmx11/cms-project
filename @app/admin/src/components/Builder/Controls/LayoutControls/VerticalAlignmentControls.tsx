import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';

const VerticalAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  return (
    <>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignTop />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { verticalAlign: 'top' },
          })
        }
      >
        Top
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignCenterVertical />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { verticalAlign: 'center' },
          })
        }
      >
        Center
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<ItemsAlignBottom />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { verticalAlign: 'bottom' },
          })
        }
      >
        Bottom
      </Button>
    </>
  );
};

export default VerticalAlignmentControls;
