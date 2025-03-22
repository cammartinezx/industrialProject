const Services = require('../Utility/Services');
const { validateString } = require('../Utility/validator');

class CourseHandler {
    
    #course_persistence;
    #student_persistence;
    #instructor_persistence;

    constructor() {
        this.#course_persistence = Services.get_course_persistence();
        this.#student_persistence = Services.get_student_persistence();
        this.#instructor_persistence = Services.get_instructor_persistence();
    }

    get_course_persistence() {
        return this.#course_persistence;
    }

    async create_course(request, response) {
        try {
            const course_id = request.body.course_id.trim();
            const title = request.body.title.trim();
            const course_description = request.body.description.trim();
            const instructor_id = request.body.instructor_id.trim().toLowerCase();

            // validate the input
            // if (!validateString(course_id) || !validateString(title) || !validateString(course_description)) {
            //     return response.status(400).json({ message: "Invalid input" });
            // }

            // check if the instructor exists
            const instructor = await this.#instructor_persistence.get_instructor(instructor_id);
            if (instructor === null) {
                return response.status(404).json({ message: "Instructor not found" });
            }

            // check if the course already exists
            const course = await this.#course_persistence.get_course(course_id);
            if (course !== null) {
                return response.status(400).json({ message: "Course already exists" });
            }

            // add the course to the database
            await this.#course_persistence.create_course(course_id, title, course_description, instructor_id);
            response.status(200).json({ message: "Course added" });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async add_student(request, response) {
        try {
            const student_id = request.body.student_id.trim().toLowerCase();
            const course_id = request.body.course_id.trim();

            // check if the student exists
            const student = await this.#student_persistence.get_student(student_id);
            if (student === null) {
                return response.status(404).json({ message: "Student not found" });
            }

            // check if the course exists
            const course = await this.#course_persistence.get_course(course_id);
            if (course === null) {
                return response.status(404).json({ message: "Course not found" });
            }

            // add the course id to student's table of courses
            await this.#student_persistence.add_course(student_id, course_id);
            // add the student to the course
            await this.#course_persistence.add_student(student_id, course_id);
            response.status(200).json({ message: "Student added to course" });
        } catch (error) {
            response.status(500).json({ message: error.message });  
        }
    }

    async get_courses(request, response) {
        try {
            const courses = await this.#course_persistence.get_courses();
            response.status(200).json({ courses: courses });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = CourseHandler;