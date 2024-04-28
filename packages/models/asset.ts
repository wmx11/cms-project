import db from '@cms/db';
import { AssetType } from '@prisma/client';

interface CreateAssetData {
  name: string;
  size: number;
  url: string;
  siteId: string;
  type: AssetType;
  format: string;
  userId: string;
  pageId?: string;
}

export const createAsset = async (data: CreateAssetData) => {
  try {
    return await db.asset.create({
      data: {
        format: data.format,
        name: data.name,
        size: data.size,
        url: data.url,
        user_id: data.userId,
        site_id: data.siteId,
        type: data.type,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAssetByName = async (name: string) => {
  try {
    return await db.asset.findUnique({
      where: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteAsset = async (id: string) => {
  try {
    return await db.asset.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
