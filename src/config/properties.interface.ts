export interface Properties {
    MONGO_URI: string;
    PORT: number,
    BASE_URL: string;
    FRONTEND_BASE_URL: string;
    AWS: {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
        AWS_BUCKET_NAME: string;
    }
  }
  