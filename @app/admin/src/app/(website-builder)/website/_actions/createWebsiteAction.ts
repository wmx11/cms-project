'use server';
import handleErrorMessages from '@cms/packages/data/handleErrorMessages';
import { withProfile } from '@cms/packages/data/profile/getters';
import { MaybeWithError } from '@cms/packages/data/types';
import { createWebsite } from '@cms/packages/data/website/setters';
import { Website } from '@prisma/client';
import slugify from 'slugify';

type CreateWebsiteActionProps = {
  templateId: string;
  alias: string;
};

const createWebsiteAction = async ({
  templateId,
  alias,
}: CreateWebsiteActionProps): Promise<MaybeWithError<Website>> => {
  try {
    const website = await withProfile(async (profile) => {
      return await createWebsite({
        templateId,
        profileId: profile?.id || '',
        alias: slugify(alias),
      });
    });

    if (website.error) {
      throw new Error(website.error);
    }

    // We cannot use redirect() in this server action because redirect() does not work between different route groups and layouts
    return website;
  } catch (error) {
    console.error('createWebsiteAction', error?.toString());
    return handleErrorMessages<Website>(error);
  }
};

export default createWebsiteAction;
