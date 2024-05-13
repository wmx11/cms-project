'use client';
import updateSiteAction from '@admin/app/(website-builder)/site/_actions/updateSiteAction';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import { ICON_STYLES, Save } from '@cms/packages/ui/components/Icons';
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

    const site = await updateSiteAction({
      id: params.id,
      schema,
      stylesSchema: styles,
    });

    if (site.error) {
      toast.error(`There's been a problem saving draft`);
    } else {
      toast.success('Draft saved successfully.');
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={handleOnClick}
        variant="outline"
        size="xs"
        loading={loading}
      >
        <Save className={ICON_STYLES} />
        <span>Save Draft</span>
      </Button>
    </>
  );
};

export default SaveDraftButton;
