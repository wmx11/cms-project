import { Prisma, Website as WebsiteSchema } from '@prisma/client';

export type Website = WebsiteSchema;
export type WebsiteDTO = Prisma.WebsiteUncheckedCreateInput;