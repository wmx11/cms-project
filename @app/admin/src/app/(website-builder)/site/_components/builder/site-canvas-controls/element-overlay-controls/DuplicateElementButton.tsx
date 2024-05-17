'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import duplicateComponent from '@cms/packages/tiglee-engine/modules/duplicateComponent';
import { Button } from '@cms/packages/ui/components/Button';
import { Duplicate, ICON_STYLES } from '@cms/packages/ui/components/Icons';
import Kbd from '@cms/ui/components/Kbd';

const DuplicateElementButton = () => {
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
    const newSchema = duplicateComponent({
      schema,
      path: selectedComonentPath,
    });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  return (
    <DefaultTooltip
      content={`Duplicate ${
        selectedComponent?.displayName ?? selectedComponent?.component
      }`}
    >
      <Button variant="ghost" size="xs" onClick={handleOnClick}>
        <Duplicate className={ICON_STYLES} />
        <span className="mr-2">Duplicate</span>
        <Kbd>⌘D</Kbd>
      </Button>
    </DefaultTooltip>
  );
};

export default DuplicateElementButton;
