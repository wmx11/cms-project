'use client';
import saveTemplateAction from '@admin/app/(website-builder)/site/_actions/saveTemplateAction';
import useBuilderHeaderProviderState from '@admin/hooks/useBuilderHeaderProviderState';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useErrorMessage from '@admin/hooks/useErrorMessage';
import { SaveTemplateData } from '@cms/controllers/template';
import { Button } from '@cms/ui/components/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@cms/ui/components/Dialog';
import ErrorMessage from '@cms/ui/components/ErrorMessage';
import { ICON_STYLES, TemplateIcon } from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import { Label } from '@cms/ui/components/Label';
import { useParams } from 'next/navigation';
import { ComponentPropsWithoutRef, FC, useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '../../../ui/Textarea';
import ImageUpload from '../../../ui/ImageUpload';
import useAssetUpload from '@admin/hooks/useAssetUpload';

interface Props extends ComponentPropsWithoutRef<'div'> {}

const SaveTemplate: FC<Props> = ({ children }) => {
  const schema = useBuilderProviderState((state) => state.schema);
  const stylesSchema = useBuilderProviderState((state) => state.styles);
  const templateName = useBuilderHeaderProviderState(
    (state) => state.template?.name
  );
  const templateDescription = useBuilderHeaderProviderState(
    (state) => state.template?.description
  );
  const templateImage = useBuilderHeaderProviderState(
    (state) => state.template?.image
  );
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(templateName || '');
  const [description, setDescription] = useState<string>(
    templateDescription || ''
  );
  const [image, setImage] = useState<File>();
  const [open, setOpen] = useState(false);
  const {
    handleUpload,
    loading: uploadLoading,
    error: uploadError,
  } = useAssetUpload();
  const { error, setError, clearErrors } = useErrorMessage<
    Pick<SaveTemplateData, 'name' | 'description'>
  >({
    general: '',
    name: '',
    description: '',
  });

  const handleSaveTemplate = async () => {
    setLoading(true);
    clearErrors();

    let _image = {};

    if (image) {
      await handleUpload({
        file: image,
        assetType: 'image',
        bucket: 'assets',
        onSuccess: (result) => {
          if (result.data) {
            _image = { image: result.data.url };
          }
        },
      });
    }

    const template = await saveTemplateAction({
      siteId: params.id,
      name,
      description,
      schema,
      stylesSchema,
      ..._image,
    });

    if (template.error) {
      setError((prev) => ({
        ...prev,
        ...template.error,
      }));
      toast.error('There has been an issue saving your template.');
    } else {
      toast.success('Your template has been saved successfully.');
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Save as a template</DialogTitle>
        <div className="space-y-4">
          <ErrorMessage errorMessage={error.general} />
          <div>
            <Label htmlFor="name">Template name</Label>
            <Input
              errorMessage={error.name}
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              name="name"
              id="name"
            />
          </div>
          <div>
            <Label htmlFor="description">Template description</Label>
            <Textarea
              errorMessage={error.description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
              name="description"
              id="description"
              showLength
            />
          </div>
          <div>
            <Label>Template image</Label>
            <ImageUpload
              src={image ? URL.createObjectURL(image) : templateImage || ''}
              onChange={setImage}
              loading={uploadLoading}
              error={uploadError}
              showDetails
            />
          </div>
          <div>
            <Button onClick={handleSaveTemplate} loading={loading}>
              <TemplateIcon className={ICON_STYLES} />
              <span>Save template</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveTemplate;
