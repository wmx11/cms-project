'use server';
import { deleteSiteController } from '@cms/controllers/site';
import handleErrorMessages from '@cms/data/handleErrorMessages';

const deleteSiteAction = async (id: string) => {
  try {
    const site = await deleteSiteController(id);
    return {
      data: { site },
    };
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    };
  }
};

export default deleteSiteAction;
