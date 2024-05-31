import db from '@cms/db';

export const getComponents = async () => {
  try {
    return await db.component.findMany();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getComponentsList = async () => {
  try {
    return await db.component.findMany({
      select: {
        alias: true,
        id: true,
        name: true,
        description: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
