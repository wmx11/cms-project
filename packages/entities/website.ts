import { WebsiteDTO } from '@cms/packages/db/schema';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { z } from 'zod';
import { EntityInterface } from './entityInterface';

export class WebsiteEntity implements EntityInterface {
  private id?: string;
  private alias: string;
  private title?: string | null;
  private description?: string | null;
  private draft_schema?:
    | Prisma.InputJsonValue
    | Prisma.NullableJsonNullValueInput
    | undefined;
  private icon?: string | null;
  private image?: string | null;
  private is_published?: boolean;
  private profile_id: string;
  private schema?:
    | Prisma.InputJsonValue
    | Prisma.NullableJsonNullValueInput
    | undefined;
  private template_id: string;

  constructor({
    id,
    alias,
    description,
    draft_schema,
    icon,
    image,
    is_published,
    profile_id,
    schema,
    template_id,
    title,
  }: WebsiteDTO) {
    this.id = id;
    this.alias = slugify(alias);
    this.description = description;
    this.draft_schema = draft_schema;
    this.icon = icon;
    this.image = image;
    this.is_published = is_published;
    this.profile_id = profile_id;
    this.schema = schema;
    this.template_id = template_id;
    this.title = title;
  }

  getId() {
    return this.id;
  }

  getAlias() {
    return this.alias;
  }

  getDescription() {
    return this.description;
  }

  getDraftSchema() {
    return this.draft_schema;
  }

  getSchema() {
    return this.schema;
  }

  getIcon() {
    return this.icon;
  }

  getImage() {
    return this.image;
  }

  getIsPublished() {
    return this.is_published;
  }

  getProfileId() {
    return this.profile_id;
  }

  getTemplateId() {
    return this.template_id;
  }

  getTitle() {
    return this.title;
  }

  validate() {
    const schema = z.object({
      template_id: z
        .string()
        .min(1, { message: 'Please provide a valid template ID' }),
      alias: z
        .string()
        .min(3, {
          message: 'Alias (website name) must be at least 3 characters long',
        })
        .max(32, {
          message: 'Alias (website name) cannot be longer than 32 characters',
        }),
      profile_id: z
        .string()
        .min(1, { message: 'Please provide a valid Profile ID' }),
    });
    schema.parse(this);
  }
}
