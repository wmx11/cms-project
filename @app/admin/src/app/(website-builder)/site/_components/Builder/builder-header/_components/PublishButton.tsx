'use client';
import useBuilderHeaderProviderState from '@admin/hooks/useBuilderHeaderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import { ICON_STYLES, Publish } from '@cms/packages/ui/components/Icons';
import { toast } from 'sonner';

const PublishButton = () => {
  const isPublished = useBuilderHeaderProviderState(
    (state) => state.isPublished
  );

  const handleOnClick = async () => {
    toast.success('Your website has been published!');
  };

  return (
    <Button onClick={handleOnClick} color="primary" size="xs">
      <Publish className={ICON_STYLES} />{' '}
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  );
};

export default PublishButton;
