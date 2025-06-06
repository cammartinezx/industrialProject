import dotenv from "dotenv";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

// 🔹 S3 Clients for Default & Student Buckets
const defaultS3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

const studentS3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.STUDENT_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.STUDENT_BUCKET_SECRET_ACCESS_KEY,
  },
});


export async function generateUploadURL(file_name, isStudent = false) {
  const bucketName = isStudent ? process.env.STUDENT_BUCKET_NAME : process.env.BUCKET_NAME;
  const s3Client = isStudent ? studentS3Client : defaultS3Client;

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: file_name,
  });

  const uploadURL = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });

  return { uploadURL };
}

export async function generateDownloadURL(file_name, isStudent = false) {
    const bucketName = isStudent ? process.env.STUDENT_BUCKET_NAME : process.env.BUCKET_NAME;
    const s3Client = isStudent ? studentS3Client : defaultS3Client;
  
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: file_name, // S3 object key (file name)
    });
  
    const downloadURL = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 300 }); // URL valid for 5 minutes
  
    return { downloadURL };
}

export async function generateListFilesURL(studentId) {
    const bucketName = process.env.STUDENT_BUCKET_NAME;
    const s3Client = studentS3Client;
  
    const getListCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `${studentId}/`,  // 🔹 Only list files for this studentId
      });
  
    const listURL = await getSignedUrl(s3Client, getListCommand, { expiresIn: 300 }); // URL valid for 5 minutes
  
    return { listURL };
  }