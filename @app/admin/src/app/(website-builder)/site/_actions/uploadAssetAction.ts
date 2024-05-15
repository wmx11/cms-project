'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import handleErrorMessages from '@cms/lib/handleErrorMessages';
import {
  uploadAssetController,
  UploadAssetData,
} from '@cms/packages/controllers/asset';

const uploadAssetAction = async (data: UploadAssetData) => {
  try {
    const result = await uploadAssetController(data);
    return { data: { ...result } } as ActionReturnTypeWithoutError<
      typeof result
    >;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<UploadAssetData>;
  }
};

export default uploadAssetAction;
