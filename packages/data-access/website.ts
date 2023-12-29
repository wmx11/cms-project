import db from '@cms/packages/db';
import { Website, WebsiteDTO } from '@cms/packages/db/schema';

export type CreateWebsite = (data: WebsiteDTO) => Promise<Website>;
export type GetWebsiteByAlias = (alias: string) => Promise<Website | null>;
export type UpdateWebsite = (data: WebsiteDTO) => Promise<void>;
export type DeleteWebsite = (alias: string) => void;

export const createWebsite: CreateWebsite = async (data: WebsiteDTO) => {
  const website = db.website.create({ data });
  return website;
};

export const getWebsiteByAlias: GetWebsiteByAlias = async (alias: string) => {
  const website = db.website.findUnique({
    where: {
      alias: alias,
    },
  });

  return website;
};

export const updateWebsite: UpdateWebsite = async (data: WebsiteDTO) => {
  await db.website.update({
    data,
    where: {
      alias: data.alias,
    },
  });
};

export const deleteWebsite: DeleteWebsite = async (alias: string) => {
  await db.website.delete({ where: { alias } });
};
