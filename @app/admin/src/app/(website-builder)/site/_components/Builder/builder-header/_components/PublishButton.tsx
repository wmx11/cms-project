'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import { Publish } from '@cms/packages/ui/components/Icons';
import { useParams } from 'next/navigation';
import updateWebsiteAction from '../../../../_actions/updateWebsiteAction';
import { toast } from 'sonner';

const PublishButton = () => {
  const params = useParams<{ id: string }>();
  const schema = useBuilderProviderState((state) => state.schema);
  const styles = useBuilderProviderState((state) => state.styles);

  const handleOnClick = async () => {
    await updateWebsiteAction({ id: params.id, schema, styles });
    toast.success('Draft schema has been saved', { position: 'top-center' });
  };

  return (
    <Button onClick={handleOnClick} color="primary" size="xs">
      <Publish className="h-3 w-3 mr-2" /> Save draft
    </Button>
  );
};

export default PublishButton;
