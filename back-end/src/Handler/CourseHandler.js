const Services = require('../Utility/Services');
const { validateString } = require('../Utility/validator');

class CourseHandler {
    
    #course_persistence;

    constructor() {
        this.#course_persistence = Services.get_course_persistence();
    }

    get_course_persistence() {
        return this.#course_persistence;
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