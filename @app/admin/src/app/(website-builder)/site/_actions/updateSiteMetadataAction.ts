'use server';
import {
  updateSiteMetadataController,
  UpdateSiteMetadataData,
} from '@cms/controllers/site';
import handleErrorMessages from '@cms/data/handleErrorMessages';

const updateSiteMetadataAction = async (
  siteId: string,
  data: UpdateSiteMetadataData | FormData
) => {
  try {
    const _data =
      data instanceof FormData
        ? ({
            title: data.get('title'),
            description: data.get('description'),
          } as UpdateSiteMetadataData)
        : data;

    const site = await updateSiteMetadataController(siteId, _data);

    return {
      data: {
        id: site?.id,
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

export default updateSiteMetadataAction;
