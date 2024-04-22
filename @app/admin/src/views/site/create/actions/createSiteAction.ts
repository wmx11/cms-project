'use server';
import { createSiteController } from '@cms/controllers/site';
import handleErrorMessages from '@cms/data/handleErrorMessages';

interface Props {
  alias: string;
  title: string;
  description: string;
  componentId: string;
  templateId?: string;
}

const createSiteAction = async (data: Props) => {
  try {
    const site = await createSiteController(data);

    return {
      data: {
        siteId: site?.id,
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

export default createSiteAction;
