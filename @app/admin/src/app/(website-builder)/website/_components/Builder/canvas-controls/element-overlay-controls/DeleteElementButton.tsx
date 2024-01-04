import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { DATA_LABEL } from '@cms/packages/template-engine/constants';
import removeComponent from '@cms/packages/template-engine/modules/removeComponent';
import { Button } from '@cms/packages/ui/components/Button';
import { Trash } from '@cms/packages/ui/components/Icons';
import Kbd from '@cms/ui/components/Kbd';

const DeleteElementButton = () => {
  const { schema, selectedElement, selectedComonentPath, renderTemplate } =
    useBuilderProviderState();

  const handleOnClick = () => {
    const newSchema = removeComponent({
      path: selectedComonentPath,
      schema,
    });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  return (
    <DefaultTooltip
      content={`Remove this ${selectedElement?.getAttribute(
        DATA_LABEL
      )} component`}
    >
      <Button
        variant="destructive"
        size="xs"
        onClick={handleOnClick}
        className="rounded-none"
      >
        <Trash className="h-3 w-3 mr-2" />
        <span className="mr-2">Delete</span>
        <Kbd>Del</Kbd>
      </Button>
    </DefaultTooltip>
  );
};

export default DeleteElementButton;
