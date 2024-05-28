'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import { deleteSiteController } from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handle-error-messages';

const deleteSiteAction = async (id: string) => {
  try {
    const site = await deleteSiteController(id);
    return {
      data: { ...site },
    } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<{ id: string }>;
  }
};

export default deleteSiteAction;
