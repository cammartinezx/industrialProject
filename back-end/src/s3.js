import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';



dotenv.config();

const region = process.env.REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.BUCKET_ACCESS_KEY_ID;
const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generateUploadURL(file_name) {
  const fileName = file_name; // Unique file name

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  })

  const uploadURL = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  )


  return {uploadURL}
}
