import { DATA_LABEL } from '@cms/template-engine/constants';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import { Trash } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import { BuilderState, Target } from '@admin/types';

// Removes the selected component
const DeleteElementButton = ({ target, state }: Target & BuilderState) => {
  const { schema, renderTemplate } = state;

  return (
    <DefaultTooltip
      content={`Remove this ${target.getAttribute(DATA_LABEL)} component`}
    >
      <Button
        color="secondary"
        variant="light"
        size="sm"
        radius="none"
        startContent={<Trash />}
        onClick={() => {
          const newSchema = removeComponent({ path: target.id, schema });

          if (!newSchema) {
            return null;
          }

          renderTemplate(newSchema);
        }}
      >
        Delete
      </Button>
    </DefaultTooltip>
  );
};

export default DeleteElementButton;
