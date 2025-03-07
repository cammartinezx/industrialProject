const express = require('express');
const router = express.Router();
const CourseHandler = require('../Handler/CourseHandler');

const course_handler = new CourseHandler();

router.get('/get-courses', async (req, res) => {
    course_handler.get_courses(req, res);
});

router.post('/add-student', async (req, res) => {
    course_handler.add_student(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the Course paths" });
});

module.exports = router;