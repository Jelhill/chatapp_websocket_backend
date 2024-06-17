import multer from 'multer';
import path from 'path';
import { properties } from '../config/properties';
import { s3Client } from '../connections/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import File from '../models/file';
import { Request, Response } from 'express';

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
});

const handleFileUpload = async (req: Request, res: Response) => {
  const file = req.file;
  console.log('File received:', file); // Debugging log
  if (file && file.buffer) { // Ensure file.buffer is used
    const fileName = `${Date.now()}-${path.basename(file.originalname)}`;
    const uploadParams = {
      Bucket: properties.AWS.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer, // Use file.buffer
      ContentType: file.mimetype,
    };

    console.log('uploadParams', uploadParams);
    try {
      // Upload file to S3 using PutObjectCommand
      const command = new PutObjectCommand(uploadParams);
      const s3file = await s3Client.send(command);
      console.log('s3file', s3file);
      const fileUrl = `https://${properties.AWS.AWS_BUCKET_NAME}.s3.${properties.AWS.AWS_REGION}.amazonaws.com/${fileName}`;
      console.log(`File uploaded to S3: ${fileUrl}`);

      const newFile = new File({
        filename: file.originalname,
        filepath: fileUrl, // S3 URL
      });
      await newFile.save();
      res.status(200).send({ link: fileUrl });
    } catch (err) {
      console.error('Error saving file information to database:', err);
      res.status(500).send('Error saving file information to database.');
    }
  } else {
    console.error('No file uploaded or file buffer not available.');
    res.status(400).send('No file uploaded or file buffer not available.');
  }
};

export { upload, handleFileUpload };
