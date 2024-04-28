import uploadAssetAction from '@admin/app/(website-builder)/site/_actions/uploadAssetAction';
import { AllowedAssetFormats } from '@cms/controllers/asset';
import { BUCKET_LIST } from '@cms/services/bucket';
import { AssetType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useErrorMessage from './useErrorMessage';
import { ActionReturnTypeWithoutError } from '@admin/types';

const useAssetUpload = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const { error, clearErrors, setError } = useErrorMessage({ general: '' });

  interface HandleUpload {
    bucket: keyof typeof BUCKET_LIST;
    assetType: AssetType;
    onError?: () => void;
    onSuccess?: (result: Awaited<ReturnType<typeof uploadAssetAction>>) => void;
  }

  const handleUpload = async (data: HandleUpload) => {
    setLoading(true);
    clearErrors();

    if (!file) {
      setLoading(false);
      return;
    }

    const buffer = await file.arrayBuffer();

    const result = await uploadAssetAction({
      asset: new Uint8Array(buffer),
      bucket: data.bucket,
      assetType: data.assetType,
      format: file.type as AllowedAssetFormats,
      name: file.name,
      siteId: params.id,
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
