import { applyVariantsAndRenderTemplate } from '@cms/template-engine/modules/applyVariants';
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '../../../../hooks/useBuilderProviderState';

const TextAlignmentControls = ({ path }: { path: string }) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const applyVariant = applyVariantsAndRenderTemplate(renderTemplate);
  return (
    <>
      <Button
        variant="light"
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
        variant="light"
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
        variant="light"
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
