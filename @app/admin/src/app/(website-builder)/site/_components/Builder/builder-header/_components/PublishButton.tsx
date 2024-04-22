'use client';
import { Button } from '@cms/packages/ui/components/Button';
import { Publish } from '@cms/packages/ui/components/Icons';
import { toast } from 'sonner';

const PublishButton = () => {
  const handleOnClick = async () => {
    toast.success('Your website has been published!');
  };

  return (
    <Button onClick={handleOnClick} color="primary" size="xs">
      <Publish className="mr-2 h-3 w-3" /> Publish
    </Button>
  );
};

export default PublishButton;
