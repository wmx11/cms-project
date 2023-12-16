import { Save } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/button';

const SaveDraftButton = () => {
  return (
    <Button
      color="secondary"
      variant="bordered"
      endContent={<Save />}
      size="sm"
    >
      Save Draft
    </Button>
  );
};

export default SaveDraftButton;
