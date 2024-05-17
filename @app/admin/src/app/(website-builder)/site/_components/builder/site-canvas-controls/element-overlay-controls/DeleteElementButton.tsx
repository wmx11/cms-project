'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import removeComponent from '@cms/packages/tiglee-engine/modules/removeComponent';
import { Button } from '@cms/packages/ui/components/Button';
import { ICON_STYLES, Trash } from '@cms/packages/ui/components/Icons';
import Kbd from '@cms/ui/components/Kbd';

const DeleteElementButton = () => {
  const schema = useBuilderProviderState((state) => state.schema);
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
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
    <DefaultTooltip
      content={`Remove ${
        selectedComponent?.displayName ?? selectedComponent?.component
      }`}
    >
      <Button variant="ghost" size="xs" onClick={handleOnClick}>
        <Trash className={ICON_STYLES} />
        <span className="mr-2">Delete</span>
        <Kbd>Del</Kbd>
      </Button>
    </DefaultTooltip>
  );
};

export default DeleteElementButton;
