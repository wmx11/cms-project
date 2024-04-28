import { withUser } from '@cms/lib/auth';
import { createAsset, getAssetByName } from '@cms/models/asset';
import { BUCKET_LIST, uploadObjectToBucket } from '@cms/services/bucket';
import { optimizeImageService } from '@cms/services/image';
import { AssetType } from '@prisma/client';

class UnsupportedFileFormat extends Error {
  constructor() {
    super('This file format is unsupported.');
  }
}

class ErrorUploadingToBucket extends Error {
  constructor() {
    super('There has been an error while uploading your asset.');
  }
}

const allowedAssetFormats = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/x-icon',
  'image/svg+xml',
] as const;

export type AllowedAssetFormats = (typeof allowedAssetFormats)[number];

export interface UploadAssetData {
  bucket: keyof typeof BUCKET_LIST;
  asset: Uint8Array;
  name: string;
  format: AllowedAssetFormats;
  assetType: AssetType;
  siteId: string;
  pageId?: string;
}

export const uploadAssetController = async (data: UploadAssetData) => {
  if (!allowedAssetFormats.find((format) => format === data.format)) {
    throw new UnsupportedFileFormat();
  }

  return await withUser(async (user) => {
    if (!user) {
      return null;
    }

    const image = await optimizeImageService({
      asset: Buffer.from(data.asset),
      assetType: data.assetType,
    });

    if (!image?.data) {
      console.error(image);
      return null;
    }

    // Declares the MIME type of the asset (image/webp)
    const format = `image/${image.info.format}`;

    // Declares the file name of the saved asset on the bucket (name.format)
    const fileName =
      data.name.split('.').at(0)?.concat(`.${image.info.format}`) || data.name;

    // Declares the final file name on the bucket. Prefix separator (/) and name.
    const key = `${data.siteId}/${fileName}`;

    const existingAsset = await getAssetByName(key);

    if (existingAsset) {
      return existingAsset;
    }

    const uploadResult = await uploadObjectToBucket({
      bucket: data.bucket,
      asset: image.data,
      contentType: format,
      key: key,
    });

    if (uploadResult?.$metadata.httpStatusCode !== 200) {
      throw new ErrorUploadingToBucket();
    }

    const asset = await createAsset({
      name: key,
      url: `${BUCKET_LIST[data.bucket].url}/${encodeURIComponent(key)}`,
      type: data.assetType,
      userId: user.id,
      siteId: data.siteId,
      size: image.info.size,
      format: format,
    });

    return asset;
  });
};

export const getAssetController = async () => {};

export const deleteAssetController = async () => {};
