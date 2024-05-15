import uploadAssetAction from '@admin/app/(website-builder)/site/_actions/uploadAssetAction';
import { AllowedAssetFormats, UploadAssetData } from '@cms/controllers/asset';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useErrorMessage from './useErrorMessage';

interface HandleUpload
  extends Omit<UploadAssetData, 'asset' | 'name' | 'format' | 'siteId'> {
  file?: File;
  onError?: () => void;
  onSuccess?: (result: Awaited<ReturnType<typeof uploadAssetAction>>) => void;
}

const useAssetUpload = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const { error, clearErrors, setError } = useErrorMessage({ general: '' });

  const handleUpload = async (data: HandleUpload) => {
    setLoading(true);
    clearErrors();

    const _file = data.file || file;

    if (!_file) {
      setLoading(false);
      return;
    }

    const buffer = await _file.arrayBuffer();

    const result = await uploadAssetAction({
      asset: new Uint8Array(buffer),
      bucket: data.bucket,
      assetType: data.assetType,
      format: _file.type as AllowedAssetFormats,
      name: _file.name,
      siteId: params.id,
      description: data?.description,
    });

    if (result.error) {
      toast.error('There has been an issue uploading your asset.');
      setError({
        general: result.error.general as string,
      });
      data.onError && data.onError();
    } else {
      toast.success('Your asset has been successfully uploaded!');
      data.onSuccess && data.onSuccess(result);
    }

    setLoading(false);
  };

  return {
    loading,
    file,
    error,
    setFile,
    handleUpload,
  };
};

export default useAssetUpload;
