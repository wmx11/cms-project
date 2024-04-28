import { config } from 'dotenv';

config();

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

export const BUCKET_LIST = {
  assets: { url: process.env.ASSETS_BUCKET_URL },
  favicon: { url: process.env.FAVICON_BUCKET_URL },
};

export const bucketClient = (() => {
  const bucketAccountId = process.env.BUCKET_ACCOUNT_ID;
  const accessKeyId = process.env.BUCKET_ACCESS_KEY;
  const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

  if (!bucketAccountId) {
    console.error('Missing BUCKET_ACCOUNT_ID env variable.');
    return;
  }

  if (!accessKeyId) {
    console.error('Missing BUCKET_ACCESS_KEY env variable.');
    return;
  }

  if (!secretAccessKey) {
    console.error('Missing BUCKET_SECRET_ACCESS_KEY env variable.');
    return;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${bucketAccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
})();

export const getAllBuckets = async () => {
  try {
    return await bucketClient?.send(new ListBucketsCommand(''));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBucketContents = async (bucket: keyof typeof BUCKET_LIST) => {
  try {
    return await bucketClient?.send(
      new ListObjectsV2Command({ Bucket: bucket })
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface UploadObjectToBucketData {
  bucket: keyof typeof BUCKET_LIST;
  asset: Uint8Array;
  key: string;
  contentType: string;
}

export const uploadObjectToBucket = async (data: UploadObjectToBucketData) => {
  try {
    return await bucketClient?.send(
      new PutObjectCommand({
        Bucket: data.bucket,
        Body: data.asset,
        Key: data.key,
        ContentType: data.contentType,
        ContentLength: data.asset.length,
      })
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
