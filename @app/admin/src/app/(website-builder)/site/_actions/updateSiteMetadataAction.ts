'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  updateSiteMetadataController,
  UpdateSiteMetadataData,
} from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handleErrorMessages';

const updateSiteMetadataAction = async (
  id: string,
  data: UpdateSiteMetadataData
) => {
  try {
    const site = await updateSiteMetadataController(id, data);
    return { data: { ...site } } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<UpdateSiteMetadataData>;
  }
};

export default updateSiteMetadataAction;
