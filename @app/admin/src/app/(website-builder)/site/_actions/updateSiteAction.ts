'use server';
import { updateSiteController, UpdateSiteData } from '@cms/controllers/site';
import handleErrorMessages from '@cms/data/handleErrorMessages';

const updateSiteAction = async (id: string, data: UpdateSiteData) => {
  try {
    const site = await updateSiteController(id, data);
    return {
      data: {
        site,
      },
    };
  } catch (error) {
    return {
      data: {
        ...handleErrorMessages(error),
      },
    };
  }
};

export default updateSiteAction;
