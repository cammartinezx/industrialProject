/** Routes
 * @namespace Student
 * @description Routes related to Profiles
 */
const express = require('express');
const router = express.Router();
const StudentHandler = require('../Handler/StudentHandler');

const student_handler = new StudentHandler(new StudentHandler());

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the User paths" });
});

/**
 * @memberof Student
 * @name Create a student profile
 * @path {POST} /:id/create-profile
 * @params {String} :id The user ID 
 * @body {String} degree The degree the student is pursuing (e.g., 'BSc Computer Science').
 * @body {String} dob The date of birth of the student (in yyyy-mm-dd format).
 * @body {Number} gpa The student's GPA (e.g., 3.5).
 * @body {String} preferred_learning_style The preferred way the student learns (e.g., 'visual', 'auditory', etc.).
 * @body {String} preferred_language The student's preferred language (e.g., 'English', 'French').
 * @body {String} location The location of the student (e.g., Winnipeg).
 * @code {200} Student profile successfully created.
 * @code {422} Validation error in request data.
 * @code {404} Student not found.
 * @code {500} Backend error from the database.
 * @response {Object} message Response message indicating success or failure.
 */

router.post("/:id/create-profile", (req, res) => {
    student_handler.create_profile(req, res);
});

/**
 * @memberof Student
 * @name Update a student profile
 * @path {PATCH} /:id/create-profile
 * @params {String} :id The user ID 
 * @body {String} degree The degree the student is pursuing (e.g., 'BSc Computer Science').
 * @body {String} dob The date of birth of the student (in yyyy-mm-dd format).
 * @body {Float} gpa The student's GPA (e.g., 3.5).
 * @body {String} preferred_learning_style The preferred way the student learns (e.g., 'visual', 'auditory', etc.).
 * @body {String} preferred_language The student's preferred language (e.g., 'English', 'French').
 * @body {String} location The location of the student (e.g., Winnipeg).
 * @code {200} Student profile successfully updated.
 * @code {422} Validation error in request data.
 * @code {404} Student not found.
 * @code {500} Backend error from the database.
 * @response {Object} message Response message indicating success or failure.
 */
router.patch("/:id/update-profile", (req, res) => {
    student_handler.update_profile(req, res);
});

/**
 * @memberof Student
 * @name Get student
 * @path {GET} /:id/get-student
 * @params {String} :id is the ID of the student whose profile is being retrieved.
 * @code {200} Profile retrieved successfully
 * @code {422} Validation error in request data
 * @code {404} Student not found
 * @code {500} Backend error from the database
 * @response {Object} The student profile object
 */
router.get("/:id/get-student", (req, res) => {
    student_handler.get_profile(req, res);
});


/**
 * @memberof Student
 * @name Get courses enrolled by student
 * @path {GET} /:id/courses
 * @params {String} :id The user ID for the student
 * @code {200} succesfully retrieved courses
 * @code {404} User does not have a profile
 * @code {404} Course not found
 * @code {500} Error message from backend
 * @response {JSON} List of courses
 
 */
router.get("/:id/courses", (req, res) => {
    student_handler.get_courses_enrolled(req, res);
});

/**
 * @memberof Student
 * @name Add a course to student's profile
 * @path {POST} /:id/add-course
 * @params {String} :id The ID of the student adding the course.
 * @body {String} course_id The ID of the course to be added.
 * @code {200} Course added successfully.
 * @code {422} Validation error in request data.
 * @code {404} Student not found.
 * @code {500} Backend error from the database.
 * @response {Object} message Response message indicating success or failure.
 */
router.post("/:id/add-course", (req, res) => {
    student_handler.add_course(req, res);
});



module.exports = router;