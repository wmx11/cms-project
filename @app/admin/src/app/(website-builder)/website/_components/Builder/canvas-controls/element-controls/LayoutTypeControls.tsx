import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import { ComponentVariants } from '@cms/template-engine/types';
import { LayoutBlock, LayoutFlex } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../../../../hooks/useBuilderProviderState';
import setActiveVariantStyles from './setActiveVariantStyles';

const LayoutTypeControls = () => {
  const {
    schema,
    selectedComponent,
    selectedComonentPath: path,
    renderTemplate,
  } = useBuilderProviderState();

  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);

  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['layoutType']
  >(selectedComponent?.componentVariants?.layoutType);

  return (
    <>
      <Button
        variant={setActiveVariant('block')}
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
        variant={setActiveVariant('flex')}
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
        variant={setActiveVariant('flexCol')}
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
