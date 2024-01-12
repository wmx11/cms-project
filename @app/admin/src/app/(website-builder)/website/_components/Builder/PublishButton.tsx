'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import { Publish } from '@cms/packages/ui/components/Icons';
import { useParams } from 'next/navigation';
import updateWebsiteAction from '../../_actions/updateWebsiteAction';
import { toast } from 'sonner';

const PublishButton = () => {
  const params = useParams<{ id: string }>();

  const { schema } = useBuilderProviderState();

  const handleOnClick = async () => {
    await updateWebsiteAction({ id: params.id, schema });
    toast.success('Draft schema has been saved', { position: 'top-center' });
  };

  return (
    <Button onClick={handleOnClick} color="primary" size="sm">
      <Publish className="h-3 w-3 mr-2" /> Publish
    </Button>
  );
};

export default PublishButton;
