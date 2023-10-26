import { DATA_LABEL } from '@cms/template-engine/constants/dataAttributes';
import { Trash } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import useGlobalStore from '../../../store/useGlobalStore';
import { Target } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';

// Removes the selected component
const DeleteElementButton = ({ target }: Target) => {
  const { schema, setSchema, renderTemplate } = useGlobalStore();

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
        onClick={async () => {
          setSchema([]);
          renderTemplate();
          console.log(schema);
          console.log('Everything got deleted');
        }}
      >
        Delete
      </Button>
    </DefaultTooltip>
  );
};

export default DeleteElementButton;
