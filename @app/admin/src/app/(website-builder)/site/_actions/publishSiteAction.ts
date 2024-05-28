'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  publishSiteController,
  PublishSiteData,
  UpdateSiteData,
} from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handle-error-messages';

const publishSiteAction = async (data: PublishSiteData) => {
  try {
    const site = await publishSiteController(data);
    return {
      data: {
        ...site,
      },
    } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<UpdateSiteData>;
  }
};

export default publishSiteAction;
