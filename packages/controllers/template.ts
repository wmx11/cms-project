import { withUser } from '@cms/lib/auth';

export const createTemplateController = async () => {
  const template = await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};

export const getTemplateController = async () => {
  const template = await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};

export const updateTemplateController = async () => {
  const template = await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};

export const deleteTemplateController = async () => {
  const template = await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};
