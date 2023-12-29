import {
  CreateWebsite,
  GetWebsiteByAlias,
} from '@cms/packages/data-access/website';
import { WebsiteDTO } from '@cms/packages/db/schema';
import { WebsiteEntity } from '@cms/packages/entities/website';
import { AuthError, GetUser } from '@cms/packages/lib/auth';

const mapWebsiteToDTO = (website: WebsiteEntity): WebsiteDTO => {
  return {
    id: website.getId(),
    template_id: website.getTemplateId(),
    alias: website.getAlias(),
    profile_id: website.getProfileId(),
    schema: website.getSchema(),
    draft_schema: website.getDraftSchema(),
  };
};

export const createWebsiteController = async (
  context: {
    getUser: GetUser;
    getWebsiteByAlias: GetWebsiteByAlias;
    createWebsite: CreateWebsite;
  },
  data: WebsiteDTO
) => {
  const user = context.getUser();

  if (!user) {
    throw new AuthError();
  }

  const existingWebsite = await context.getWebsiteByAlias(data.alias);

  if (existingWebsite) {
    throw new Error('Website by this name already exists.');
  }

  const newWebsite = new WebsiteEntity(data);

  newWebsite.validate();

  await context.createWebsite(mapWebsiteToDTO(newWebsite));
};
