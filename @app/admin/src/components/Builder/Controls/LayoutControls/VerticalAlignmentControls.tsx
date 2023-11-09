import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import {
  ItemsAlignBottom,
  ItemsAlignCenterVertical,
  ItemsAlignTop,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import setActiveVariantStyles from './setActiveVariantStyles';
import { ComponentVariants } from '@cms/template-engine/types';

const VerticalAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  const component = traverseComponentsTree({ schema, path });
  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['verticalAlign']
  >(component?.componentVariants?.verticalAlign);

  return (
    <>
      <Button
        variant={setActiveVariant('top')}
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
        variant={setActiveVariant('center')}
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
        variant={setActiveVariant('bottom')}
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
