
import { config } from 'dotenv';
import { Properties } from './properties.interface'
config();

export const properties: Properties = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/chat',
  PORT: 3000,
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  AWS: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'chatbucketfortest',
  }
};

