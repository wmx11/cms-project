import { Button } from '@nextui-org/react';
import DefaultTooltip from '../../DefaultTooltip';
import { Trash } from '@cms/ui/components/Icons';
import { Target } from '../../../types';
import { DATA_LABEL } from '@cms/template-engine/constants/dataAttributes';

// Removes the selected component
const DeleteElementButton = ({ target }: Target) => {
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
      >
        Delete
      </Button>
    </DefaultTooltip>
  );
};

export default DeleteElementButton;
