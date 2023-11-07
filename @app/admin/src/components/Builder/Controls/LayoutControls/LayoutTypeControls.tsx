import {
  applyVariantsAndRenderTemplate,
} from '@cms/template-engine/modules/applyVariants';
import { LayoutBlock, LayoutFlex } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';

const LayoutTypeControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  return (
    <>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<LayoutBlock />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { layoutType: 'block' },
          })
        }
      >
        Block
      </Button>
      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<LayoutFlex />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { layoutType: 'flex' },
          })
        }
      >
        Flex row
      </Button>

      <Button
        variant="light"
        color="secondary"
        radius="none"
        startContent={<LayoutFlex />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { layoutType: 'flexCol' },
          })
        }
      >
        Flex column
      </Button>
    </>
  );
};

export default LayoutTypeControls;
