import {
  applyVariantsAndRenderTemplate,
} from '@cms/template-engine/modules/applyVariants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import { ComponentVariants } from '@cms/template-engine/types';
import { LayoutBlock, LayoutFlex } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import setActiveVariantStyles from './setActiveVariantStyles';

const LayoutTypeControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  const component = traverseComponentsTree({ schema, path });
  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['layoutType']
  >(component?.componentVariants?.layoutType);
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
