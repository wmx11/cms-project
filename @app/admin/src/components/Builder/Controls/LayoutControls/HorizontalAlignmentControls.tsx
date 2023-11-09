import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import setActiveVariantStyles from './setActiveVariantStyles';
import { ComponentVariants } from '@cms/template-engine/types';

const HorizontalAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  const component = traverseComponentsTree({ schema, path });
  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['horizontalAlign']
  >(component?.componentVariants?.horizontalAlign);
  return (
    <>
      <Button
        variant={setActiveVariant('left')}
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
        variant={setActiveVariant('center')}
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
        variant={setActiveVariant('right')}
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
        variant={setActiveVariant('between')}
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
