---

# Backend Setup – Document Storage & Database with AWS (S3 + DynamoDB)

This guide outlines how we set up the backend infrastructure to support document storage for students and instructors using **Amazon S3** and **DynamoDB**. Documents are securely uploaded from the frontend using **pre-signed URLs**, which is ideal for serverless environments such as **AWS Lambda** or **Next.js** applications.

---

## Prerequisites

1. **AWS Account** with appropriate permissions  
2. **AWS CLI** installed and configured (`aws configure`)  
3. **IAM Access** to create S3 buckets and policies  
4. Your backend environment should support `.env` configuration (e.g., Node.js, Next.js, etc.)

---

## Step-by-Step Setup
We followed this [YouTube tutorial](https://youtu.be/yGYeYJpRWPM?si=xZjHKomYcY9sFCaw) to upload files directly from the frontend to S3 using **pre-signed URLs**.

### 1. Create S3 Buckets

We created two S3 buckets:

- **Student Documents Bucket**  
  Structure: `userid/courseid/unitname`

- **Instructor Documents Bucket**  
  Structure: `courseid/unitname`

You can create them manually in the AWS Console or via the AWS CLI:

```sh
aws s3 mb s3://your-student-bucket-name
aws s3 mb s3://your-instructor-bucket-name
```

---

### 2. Create IAM Policies

Define a policy that allows read/write access to the respective buckets. Here’s an example policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::your-student-bucket-name/*",
        "arn:aws:s3:::your-instructor-bucket-name/*"
      ]
    }
  ]
}
```

---

### 3. Create IAM Users

Create an IAM user and attach the above policy to it. Generate the **Access Key ID** and **Secret Access Key** for backend use.

---

### 4. Configure the Frontend to Upload Files Securely

- The frontend requests a pre-signed URL from the backend.
- The backend generates the signed URL using the AWS SDK.
- The frontend uses this URL to upload files securely to S3.

This technique ensures secure, direct file uploads without routing them through the server.

---

## DynamoDB Setup

We used **AWS DynamoDB** to store our application data across multiple tables:

| Table Name     | Purpose                           |
|----------------|-----------------------------------|
| `user`         | Basic user data                   |
| `student`      | Student-specific data             |
| `instructor`   | Instructor-specific data          |
| `course`       | Course metadata                   |
| `conversation` | Messaging/chat-related content    |
| `notification` | User notifications and alerts     |

---

## Environment Variables (`.env`)

Here are the essential keys we defined in our `.env` file for AWS integration:

```env
# AWS General Credentials
ACCESS_KEY_ID=your-access-key-id
SECRET_ACCESS_KEY=your-secret-access-key
REGION=your-region

# Instructor S3 Bucket
BUCKET_NAME=instructor-docs-bucket
BUCKET_ACCESS_KEY_ID=...
BUCKET_SECRET_ACCESS_KEY=...

# Student S3 Bucket
STUDENT_BUCKET_NAME=student-docs-bucket
STUDENT_BUCKET_ACCESS_KEY_ID=...
STUDENT_BUCKET_SECRET_ACCESS_KEY=...
```
