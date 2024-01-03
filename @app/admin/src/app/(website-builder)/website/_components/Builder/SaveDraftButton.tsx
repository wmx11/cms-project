import { Save } from '@cms/packages/ui/components/Icons';
import { Button } from '@cms/packages/ui/components/Button';

const SaveDraftButton = () => {
  return (
    <Button variant="outline" size="sm">
      <Save className="h-3 w-3 mr-2" /> Save Draft
    </Button>
  );
};

export default SaveDraftButton;
