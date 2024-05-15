import { AssetType } from '@prisma/client';
import sharp from 'sharp';

export interface OptimizeImageServiceData {
  asset: Uint8Array;
  assetType: AssetType;
}

export const optimizeImageService = async (
  data: OptimizeImageServiceData
): Promise<{ data: Buffer; info: sharp.OutputInfo } | null> => {
  try {
    switch (data.assetType) {
      case 'image':
        return await sharp(data.asset)
          .webp({
            quality: 50,
            lossless: true,
          })
          .toBuffer({ resolveWithObject: true });
      case 'meta_image':
        return await sharp(data.asset)
          .webp({
            quality: 80,
            lossless: true,
          })
          .resize({
            width: 1200,
            height: 630,
            fit: 'cover',
          })
          .toBuffer({ resolveWithObject: true });
      case 'icon':
        return await sharp(data.asset)
          .png({
            quality: 80,
          })
          .resize({
            width: 32,
            height: 32,
          })
          .toBuffer({ resolveWithObject: true });
      default:
        return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
