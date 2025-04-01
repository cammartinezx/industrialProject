const dotenv = require("dotenv");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

// 🔹 Generate Pre-Signed Upload URL
async function generateUploadURL(file_name, isStudent = false) {
  const bucketName = isStudent ? process.env.STUDENT_BUCKET_NAME : process.env.BUCKET_NAME;
  const s3Client = isStudent ? studentS3Client : defaultS3Client;

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: file_name,
  });

  const uploadURL = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });

  return { uploadURL };
}

module.exports = { generateUploadURL };