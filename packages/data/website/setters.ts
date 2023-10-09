/**
 * User comes to "Create New Website"
 * User chooses a template or a blank one
 * A new Website entry is created and assigned to User profile
 * User is redirected to /website/edit/id
 * User can now edit the template or create a new one
 * Every action is updating the draft_schema
 * When published, draft_schema overrides the schema entry
 */

import { Website } from '@prisma/client';
import slugify from 'slugify';
import prisma from '../prisma';
import { MaybeWithError } from '../types';
import { z } from 'zod';
import handleErrorMessages from '../handleErrorMessages';

type CreateWebsiteProps = {
  templateId: string;
  profileId: string;
  alias: string;
};

export const createWebsite = async ({
  templateId,
  profileId,
  alias,
}: CreateWebsiteProps): Promise<MaybeWithError<Website>> => {
  try {
    const schema = z.object({
      templateId: z
        .string()
        .min(1, { message: 'Must provide a valid template ID' }),
      alias: z
        .string()
        .min(3, { message: 'Alias must be at least 3 characters long' })
        .max(32, { message: 'Alias cannot be longer than 32 characters' }),
      profileId: z
        .string()
        .min(1, { message: 'Must provide a valid Profile ID' }),
    });

    schema.parse({ templateId, profileId, alias });

    const templateSchema = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
      select: {
        schema: true,
      },
    });

    const existingWebsite = await prisma.website.findUnique({
      where: {
        alias: slugify(alias),
      },
      select: {
        id: true,
      },
    });

    if (existingWebsite) {
      throw `Website with name ${alias} already exists. Please choose another name.`;
    }

    return await prisma.website.create({
      data: {
        alias: slugify(alias),
        profile_id: profileId,
        draft_schema: templateSchema?.schema
          ? JSON.stringify(templateSchema?.schema || [])
          : JSON.stringify([]),
      },
    });
  } catch (error) {
    console.error('createWebsite', error?.toString());
    return handleErrorMessages<Website>(error);
  }
};
