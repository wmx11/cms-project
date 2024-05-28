'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import { updateSiteController, UpdateSiteData } from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handle-error-messages';

const updateSiteAction = async (data: UpdateSiteData) => {
  try {
    const site = await updateSiteController(data);
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

export default updateSiteAction;
