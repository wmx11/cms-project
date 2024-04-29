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
  const [icon, setIcon] = useState<File>();
  const [image, setImage] = useState<File>();
  const { handleUpload } = useAssetUpload();
  const { error, setError, clearErrors } =
    useErrorMessage<UpdateSiteMetadataData>({
      title: undefined,
      description: undefined,
      general: undefined,
    });

  const handleOnClick = async () => {
    setLoading(true);

    let _icon = {};
    let _image = {};

    if (icon) {
      await handleUpload({
        assetType: 'icon',
        bucket: 'favicon',
        file: icon,
        onSuccess: (result) => {
          if (result.data) {
            _icon = { icon: result.data.url };
          }
        },
      });
    }

    if (image) {
      await handleUpload({
        assetType: 'meta_image',
        bucket: 'assets',
        file: image,
        onSuccess: (result) => {
          if (result.data) {
            _image = { image: result.data.url };
          }
        },
      });
    }

    const site = await updateSiteMetadataAction(params.id, {
      title,
      description,
      ..._icon,
      ..._image,
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
      <div className="flex w-full items-end gap-2">
        <div>
          <DefaultTooltip
            withIcon
            content="Your site favicon is the tiny image displayed right next to your site
            title. It's also displayed on search engine results and social media
            cards. We highly suggest your site has a favicon for increased
            credibility and SEO scores. Please use images that are 32px x 32px."
          >
            <Label>Icon</Label>
          </DefaultTooltip>
          <ImageUpload
            src={icon ? URL.createObjectURL(icon) : props.icon || ''}
            onChange={setIcon}
            variant="favicon"
          />
        </div>
        <div className="flex-1">
          <Input
            name="title"
            label="Site title"
            value={title || ''}
            onChange={(e) => setTitle(e.currentTarget.value)}
            errorMessage={error.title}
          />
        </div>
      </div>

      <BrowserTab icon={icon ? URL.createObjectURL(icon) : props.icon || ''}>
        {title}
      </BrowserTab>

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

      <div>
        <DefaultTooltip
          withIcon
          content="Your site meta image is the image that is displayed when your site link is shared with other people on social media platforms. It's the preview image of your website that creates the first impression. We recommend you to use images that are 1200px x 630px."
        >
          <Label>Site meta image</Label>
        </DefaultTooltip>
        <ImageUpload
          src={image ? URL.createObjectURL(image) : props.image || ''}
          onChange={setImage}
          variant="default"
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
