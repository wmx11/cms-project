'use client';
import updateSiteAction from '@admin/app/(website-builder)/site/_actions/updateSiteAction';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/packages/ui/components/Button';
import {
  ICON_STYLES,
  Save,
  TemplateIcon,
} from '@cms/packages/ui/components/Icons';
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

    if (site.error) {
      toast.error(`There's been a problem saving draft`);
    } else {
      toast.success('Draft saved successfuly.');
    }

    setLoading(false);
  };

  return (
    <>
      <Button variant="outline" size="xs">
        <TemplateIcon className={ICON_STYLES} />
        Save Template
      </Button>
      <Button
        onClick={handleOnClick}
        variant="outline"
        size="xs"
        loading={loading}
      >
        <Save className={ICON_STYLES} /> Save Draft
      </Button>
    </>
  );
};

export default SaveDraftButton;
