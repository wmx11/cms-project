'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  updateSiteMetadataController,
  UpdateSiteMetadataData,
} from '@cms/controllers/site';
import handleErrorMessages from '@cms/data/handleErrorMessages';

const updateSiteMetadataAction = async (
  siteId: string,
  data: UpdateSiteMetadataData
) => {
  try {
    const site = await updateSiteMetadataController(siteId, data);
    return { data: { ...site } } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<UpdateSiteMetadataData>;
  }
};

export default updateSiteMetadataAction;
