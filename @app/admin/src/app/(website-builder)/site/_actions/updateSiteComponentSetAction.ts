'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  updateSiteComponentSetController,
  UpdateSiteComponentSetData,
} from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handle-error-messages';

const updateSiteComponentSetAction = async (
  data: UpdateSiteComponentSetData
) => {
  try {
    const site = await updateSiteComponentSetController(data);
    return {
      data: { ...site },
    } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<{}>;
  }
};

export default updateSiteComponentSetAction;
