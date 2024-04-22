'use client';
import updateSiteAction from '@admin/app/(website-builder)/site/_actions/updateSiteAction';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import { Save } from '@cms/packages/ui/components/Icons';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const SaveDraftButton = () => {
  const params = useParams<{ id: string }>();
  const schema = useBuilderProviderState((state) => state.schema);
  const styles = useBuilderProviderState((state) => state.styles);
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setLoading(true);

    const site = await updateSiteAction(params.id, {
      schema,
      stylesSchema: styles,
    });

    if (site.data.site) {
      toast.success('Draft saved successfuly.');
    } else {
      toast.error(`There's been a problem saving draft`);
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={handleOnClick}
      variant="outline"
      size="xs"
      loading={loading}
    >
      <Save className="mr-2 h-3 w-3" /> Save Draft
    </Button>
  );
};

export default SaveDraftButton;
