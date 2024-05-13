import { UploadAssetData } from '@cms/controllers/asset';
import db from '@cms/db';
import { AssetType } from '@prisma/client';

interface CreateAssetData
  extends Omit<UploadAssetData, 'bucket' | 'asset' | 'assetType'> {
  size: number;
  url: string;
  type: AssetType;
  userId: string;
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
        description: data?.description,
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
