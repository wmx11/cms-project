'use client';
import BrowserTab from '@admin/components/BrowserTab';
import { Button } from '@cms/ui/components/Button';
import { Input } from '@cms/ui/components/Input';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import updateSiteMetadataAction from '../../../_actions/updateSiteMetadataAction';
import { BuilderSidebarProps } from '../BuilderPage';
import { Textarea } from '../ui/Textarea';
import { ICON_STYLES, Save } from '@cms/ui/components/Icons';
import useErrorMessage from '@admin/hooks/useErrorMessage';
import { UpdateSiteMetadataData } from '@cms/controllers/site';

const Metadata: FC<BuilderSidebarProps> = (props) => {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [loading, setLoading] = useState(false);
  const { error, setError, clearErrors } =
    useErrorMessage<UpdateSiteMetadataData>({
      title: undefined,
      description: undefined,
      general: undefined,
    });

  const handleOnClick = async () => {
    setLoading(true);

    const site = await updateSiteMetadataAction(params.id, {
      title,
      description,
    });

    if (site.error) {
      toast.error('There has been an issue updating site metadata.');
      setError(site.error);
    } else {
      toast.success('Your site metadata has been successfully updated!');
      clearErrors();
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          name="title"
          label="Site title"
          value={title || ''}
          onChange={(e) => setTitle(e.currentTarget.value)}
          errorMessage={error.title}
        />
        <BrowserTab className="mt-2">{title}</BrowserTab>
      </div>

      <div>
        <Textarea
          name="description"
          label="Site description"
          value={description || ''}
          onChange={(e) => setDescription(e.currentTarget.value)}
          errorMessage={error.description}
          showLength
        />
      </div>
      <Button onClick={handleOnClick} loading={loading} size="xs">
        <Save className={ICON_STYLES} />
        Save Metadata
      </Button>
    </div>
  );
};

export default Metadata;
