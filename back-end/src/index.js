const User = require("./Router/User.js");
const Chatbot = require("./Router/Chatbot.js");
const Course = require("./Router/Course.js");
const Student = require("./Router/Student.js");
const Instructor = require("./Router/Instructor.js");
const Conversation = require("./Router/Conversation.js");

const express = require('express');
const cors = require('cors');
const { generateUploadURL, generateDownloadURL } = require("./s3.js");
require("dotenv").config();


const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.use("/user", User);
app.use("/chatbot", Chatbot);
app.use("/course", Course);
app.use('/student', Student);
app.use('/instructor', Instructor);
app.use('/conversation', Conversation);


app.get("/", async (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "we cooking rn" });
});

app.get('/s3Url', async (req, res) => {
    const {fileName} = req.query;
    const urlS3 = await generateUploadURL(fileName)
    res.send({urlS3})
  })
app.get('/student-s3Url', async (req, res) => {
    const {fileName} = req.query;
    const urlS3 = await generateUploadURL(fileName, true)
    res.send({urlS3})
  })
  app.get('/s3Url-download', async (req, res) => {
    const {fileName} = req.query;
    const urlS3 = await generateDownloadURL(fileName)
    res.send({urlS3})
  })
app.get('/student-s3Url-download', async (req, res) => {
    const {fileName} = req.query;
    const urlS3 = await generateDownloadURL(fileName, true)
    res.send({urlS3})
  })
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});