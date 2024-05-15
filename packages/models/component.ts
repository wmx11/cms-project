import db from '@cms/db';

export const getComponents = async () => {
  try {
    return await db.component.findMany();
  } catch (error) {
    console.error(error);
    return null;
  }
};
