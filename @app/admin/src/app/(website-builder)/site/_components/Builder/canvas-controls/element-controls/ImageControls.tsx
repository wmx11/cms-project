'use client';
import useAssetUpload from '@admin/hooks/useAssetUpload';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Textarea } from '@cms/ui/components/Textarea';
import { ChangeEvent, useRef } from 'react';
import ImageUpload from '../../ui/ImageUpload';

const ImageControls = () => {
  const { error, handleUpload, loading, setFile } = useAssetUpload();

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  const src =
    (selectedComponent?.props.find((item) => item.name === 'src')
      ?.value as string) || '';

  const alt =
    (selectedComponent?.props.find((item) => item.name === 'alt')
      ?.value as string) || '';

  const altDescription = useRef(alt);

  const handleOnChange = (e: ChangeEvent) => {
    const target = e?.currentTarget as HTMLTextAreaElement;

    const alt = selectedComponent?.props.find((item) => item.name === 'alt');

    if (alt && alt.value) {
      alt.value = target.value;
      altDescription.current = target.value;
    }
  };

  return (
    <div className="space-y-2">
      <ImageUpload
        src={src}
        error={error}
        variant="default"
        loading={loading}
        onChange={setFile}
        onUpload={() =>
          handleUpload({
            assetType: 'image',
            bucket: 'assets',
            onSuccess: (result) => {
              const src = selectedComponent?.props.find(
                (item) => item.name === 'src'
              );

              if (src && src.value) {
                src.value = result.data?.url as string;
              }

              renderTemplate();
            },
          })
        }
        showDetails
      />

      <Textarea
        label="Image alt description"
        defaultValue={altDescription.current}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default ImageControls;
