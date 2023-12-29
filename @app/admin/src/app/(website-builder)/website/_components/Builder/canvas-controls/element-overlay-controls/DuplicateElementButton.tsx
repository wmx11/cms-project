import duplicateComponent from '@cms/packages/template-engine/modules/duplicateComponent';
import { Duplicate } from '@cms/packages/ui/components/Icons';
import { Button } from '@nextui-org/react';
import { BuilderState, Target } from '@admin/types';

const DuplicateElementButton = ({ target, state }: Target & BuilderState) => {
  const { schema, renderTemplate } = state;

  const handleClick = () => {
    const newSchema = duplicateComponent({ schema, path: target.id });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  return (
    <Button
      color="secondary"
      variant="light"
      size="sm"
      radius="none"
      startContent={<Duplicate />}
      onClick={handleClick}
    >
      Duplicate
    </Button>
  );
};

export default DuplicateElementButton;
