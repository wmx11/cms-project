'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import removeComponent from '@cms/packages/template-engine/modules/removeComponent';
import { Button } from '@cms/packages/ui/components/Button';
import { Trash } from '@cms/packages/ui/components/Icons';
import Kbd from '@cms/ui/components/Kbd';

const DeleteElementButton = () => {
  const schema = useBuilderProviderState((state) => state.schema);
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );
  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

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
    <Button
      variant="outline"
      size="xs"
      onClick={handleOnClick}
      className="rounded-none"
    >
      <Trash className="h-3 w-3 mr-2" />
      <span className="mr-2">Delete</span>
      <Kbd>Del</Kbd>
    </Button>
  );
};

export default DeleteElementButton;
