import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { properties } from '../config/properties';

dotenv.config();

const s3Client = new S3Client({
  region: properties.AWS.AWS_REGION,
  credentials: {
    accessKeyId: properties.AWS.AWS_ACCESS_KEY_ID!,
    secretAccessKey: properties.AWS.AWS_SECRET_ACCESS_KEY!,
  },
});


export { s3Client };
