import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import { ComponentVariants } from '@cms/template-engine/types';
import {
  ItemsAlignBetween,
  ItemsAlignCenterHorizontal,
  ItemsAlignLeft,
  ItemsAlignRight,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../../../../hooks/useBuilderProviderState';
import setActiveVariantStyles from './setActiveVariantStyles';

const HorizontalAlignmentControls = () => {
  const {
    schema,
    selectedComponent,
    selectedComonentPath: path,
    renderTemplate,
  } = useBuilderProviderState();

  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);

  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['horizontalAlign']
  >(selectedComponent?.componentVariants?.horizontalAlign);

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
