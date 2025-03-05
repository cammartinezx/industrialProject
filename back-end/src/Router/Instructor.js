/**
 * @module InstructorRouter
 * @description Routes for managing instructor profiles and related data.
 */

const express = require("express");
const router = express.Router();
const InstructorHandler = require("../Handler/InstructorHandler");

const instructor_handler = new InstructorHandler();

// // Root route
// router.use("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Instructor paths" });
// });
/**
 * @module InstructorRouter
 * @description Routes for managing instructor profiles and related data.
 */

/**
 * @memberof Instructor
 * @name Create an instructor profile
 * @path {POST} /:id/create-instructor
 * @params {String} :id The user ID 
 * @body {string} location:The location of the instructor (e.g., Winnipeg).
 * @body {string} dob: Updated date of birth (in yyyy-mm-dd format).
 * @body {string} department: Updated department name
 * @body {string} preferred_language: Updated preferred language for communication
 * @code {200} Success message indicating the instructor profile was created
 * @code {422} Validation error message for invalid input data
 * @code {404} Error message if the user already exists
 * @code {500} Internal server error message
 * 
 */
router.post("/:id/create-instructor", (req, res) => {
    instructor_handler.create_instructor(req, res);
});

/**
 * @memberof Instructor
 * @name Update an instructor profile
 * @path {PATCH} /:id/update-instructor
 * @params {String} :id The user ID 
 * @body {string} location:The location of the instructor (e.g., Winnipeg).
 * @body {string} dob: Updated date of birth (in yyyy-mm-dd format).
 * @body {string} department: Updated department name
 * @body {string} preferred_language: Updated preferred language for communication
 * @code {200} Success message indicating the instructor profile was updated
 * @code {422} Validation error message for invalid input data
 * @code {404} Error message if the user does not exist
 * @code {500} Internal server error message
 */
router.patch("/:id/update-instructor", (req, res) => {
    instructor_handler.update_instructor(req, res);
});

/**
 * @memberof Instructor
 * @name Get an instructor profile
 * @path {GET} /:id/get-instructor
 * @params {string} id: Unique identifier for the instructor
 * @code {200} Instructor retrieved succesfully
 * @code {404} Error message if the instructor does not exist
 * @code {422} Validation error message for invalid input data
 * @code {500} Internal server error message
 * @response Instructor profile data
 */
router.get("/:id/get-instructor", (req, res) => {
    instructor_handler.get_instructor(req, res);
});

/**
 * @memberof Instructor
 * @name Get courses taught by instructor
 * @path {GET} /:id/courses-taught
 * @params {string} id: Unique identifier for the instructor
 * @code {200} List of courses taught by the instructor
 * @code {404} Error message if the instructor does not have any courses
 * @code {422} Validation error message for invalid input data
 * @code {500} Internal server error message
 * @response {200} List of courses taught by the instructor
 */
router.get("/:id/courses-taught", (req, res) => {
    instructor_handler.get_courses_taught(req, res);
});

/**
 * @memberof Instructor
 * @name Add a course to instructor's profile
 * @path {POST} /:id/add-course
 * @body {string} course_id: The unique identifier of the course to be added
 * @params {string} id: Unique identifier for the instructor
 * @code {200} Success message indicating the course was added
 * @code {422} Validation error message for invalid input data
 * @code {404} Error message if the instructor or course does not exist
 * @code {500} Internal server error message
 */
router.post("/:id/add-course", (req, res) => {
    instructor_handler.add_course(req, res);
});
