'use client';
import { Button } from '@cms/packages/ui/components/Button';
import { ICON_STYLES, Publish } from '@cms/packages/ui/components/Icons';
import { toast } from 'sonner';

const PublishButton = () => {
  const handleOnClick = async () => {
    toast.success('Your website has been published!');
  };

  return (
    <Button onClick={handleOnClick} color="primary" size="xs">
      <Publish className={ICON_STYLES} /> Publish
    </Button>
  );
};

export default PublishButton;
