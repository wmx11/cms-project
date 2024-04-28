'use client';
import BrowserTab from '@admin/components/BrowserTab';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useAssetUpload from '@admin/hooks/useAssetUpload';
import useErrorMessage from '@admin/hooks/useErrorMessage';
import { UpdateSiteMetadataData } from '@cms/controllers/site';
import { Button } from '@cms/ui/components/Button';
import { ICON_STYLES, Save } from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import { Label } from '@cms/ui/components/Label';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import updateSiteMetadataAction from '../../../_actions/updateSiteMetadataAction';
import { BuilderSidebarProps } from '../BuilderPage';
import ImageUpload from '../ui/ImageUpload';
import { Textarea } from '../ui/Textarea';

const Metadata: FC<BuilderSidebarProps> = (props) => {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [loading, setLoading] = useState(false);
  const { handleUpload, setFile, file } = useAssetUpload();
  const { error, setError, clearErrors } =
    useErrorMessage<UpdateSiteMetadataData>({
      title: undefined,
      description: undefined,
      general: undefined,
    });

  const handleOnClick = async () => {
    setLoading(true);

    let icon = {};

    if (file) {
      await handleUpload({
        assetType: 'icon',
        bucket: 'favicon',
        onSuccess: (result) => {
          if (result.data) {
            icon = { icon: result.data.url };
          }
        },
      });
    }

    const site = await updateSiteMetadataAction(params.id, {
      title,
      description,
      ...icon,
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
        <DefaultTooltip
          withIcon
          content="Your site favicon is the tiny image displayed right next to your site
          title. It's also displayed on search engine results and social media
          cards. We highly suggest your site has a favicon for increased
          credibility and SEO scores."
        >
          <Label>Site favicon</Label>
        </DefaultTooltip>
        <ImageUpload
          src={file ? URL.createObjectURL(file) : props.icon || ''}
          onChange={setFile}
          variant="favicon"
        />
      </div>
      <div>
        <Input
          name="title"
          label="Site title"
          value={title || ''}
          onChange={(e) => setTitle(e.currentTarget.value)}
          errorMessage={error.title}
        />
        <BrowserTab
          icon={file ? URL.createObjectURL(file) : props.icon || ''}
          className="mt-2"
        >
          {title}
        </BrowserTab>
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
