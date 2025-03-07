const User = require("./Router/User.js");
const Chatbot = require("./Router/Chatbot.js");
const Course = require("./Router/Course.js");
const Student = require("./Router/Student.js");
const Instructor = require("./Router/Instructor.js");

const express = require('express');
const cors = require('cors');
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
//app.use('/course', Course);

app.get("/", async (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "we cooking rn" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});