const Services = require('../Utility/Services');
const { validateString } = require('../Utility/validator');

class CourseHandler {
    
    #course_persistence;
    #student_persistence;

    constructor() {
        this.#course_persistence = Services.get_course_persistence();
        this.#student_persistence = Services.get_student_persistence();
    }

    get_course_persistence() {
        return this.#course_persistence;
    }

    async add_student(request, response) {
        try {
            const { student_id, course_id } = request.body;

            if (!validateString(student_id) || !validateString(course_id)) {
                return response.status(400).json({ message: "Invalid data" });
            }

            await this.#course_persistence.add_student(student_id, course_id);
            response.status(200).json({ message: "Student added to course" });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }

    async get_courses(request, response) {
        try {
            const courses = await this.#course_persistence.get_courses();
            response.status(200).json({ courses: courses });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = CourseHandler;