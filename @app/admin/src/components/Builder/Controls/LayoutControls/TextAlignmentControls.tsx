import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import { ComponentVariants } from '@cms/template-engine/types';
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';
import setActiveVariantStyles from './setActiveVariantStyles';

const TextAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  const component = traverseComponentsTree({ schema, path });
  const setActiveVariant = setActiveVariantStyles<
    ComponentVariants['textAlign']
  >(component?.componentVariants?.textAlign);

  return (
    <>
      <Button
        variant={setActiveVariant('left')}
        color="secondary"
        radius="none"
        startContent={<TextAlignLeft />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { textAlign: 'left' },
          })
        }
      >
        Left
      </Button>
      <Button
        variant={setActiveVariant('center')}
        color="secondary"
        radius="none"
        startContent={<TextAlignCenter />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { textAlign: 'center' },
          })
        }
      >
        Center
      </Button>
      <Button
        variant={setActiveVariant('right')}
        color="secondary"
        radius="none"
        startContent={<TextAlignRight />}
        onClick={() =>
          applyVariant({
            path,
            schema,
            variant: { textAlign: 'right' },
          })
        }
      >
        Right
      </Button>
    </>
  );
};

export default TextAlignmentControls;
