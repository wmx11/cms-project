'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import { updateSiteController, UpdateSiteData } from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handleErrorMessages';

const updateSiteAction = async (id: string, data: UpdateSiteData) => {
  try {
    const site = await updateSiteController(id, data);
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
