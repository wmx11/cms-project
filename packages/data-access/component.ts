import db from '@cms/packages/db';

export type CreateTemplate = () => Promise<void>;
export type UpdateTemplate = () => void;
export type DeleteTemplate = () => void;

export const createTemplate: CreateTemplate = async () => {
  await db.template.create({ data: {} });
};

export const getTemplate = async () => {};
export const updateTemplate: UpdateTemplate = async () => {};
export const deleteTemplate: DeleteTemplate = async () => {};
