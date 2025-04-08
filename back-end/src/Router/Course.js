const express = require('express');
const router = express.Router();
const CourseHandler = require('../Handler/CourseHandler');

const course_handler = new CourseHandler();

router.post('/create-course', async (req, res) => {
    course_handler.create_course(req, res);
});

router.get('/:id/get-course', async (req, res) => {
    course_handler.get_course(req, res);
});

router.post('/add-student', async (req, res) => {
    course_handler.add_student(req, res);
});

router.post('/:id/add-unit', async (req, res) => {
    course_handler.add_unit(req, res);
});

router.get('/:course_id/get-students', async (req, res) => {
    course_handler.get_students_in_course(req, res);
});

router.get('/:course_id/get-instructor', async (req, res) => {
    course_handler.get_instructor_of_course(req, res);
});

router.post('/add-prompt', async (req, res) => {
    course_handler.add_prompt(req, res);
});

router.patch('/update-prompt', async (req, res) => {
    course_handler.update_prompt(req, res);
});

router.get('/:course_id/get-prompts', async (req, res) => {
    course_handler.get_prompts(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the Course paths" });
});

module.exports = router;