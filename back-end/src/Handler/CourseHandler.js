const Services = require('../Utility/Services');
const { validateString } = require('../Utility/validator');

class CourseHandler {
    
    #course_persistence;
    #student_persistence;
    #instructor_persistence;
    #user_persistence;

    constructor() {
        this.#course_persistence = Services.get_course_persistence();
        this.#student_persistence = Services.get_student_persistence();
        this.#instructor_persistence = Services.get_instructor_persistence();
        this.#user_persistence = Services.get_user_persistence();
    }

    get_course_persistence() {
        return this.#course_persistence;
    }

    async create_course(request, response) {
        try {
            let course_id = request.params.id.trim().toLowerCase();
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

    
    async add_unit(request, response) {
        try {
            const unit_title = request.body.unit_title.trim();
            let course_id = request.params.id.trim().toLowerCase();

            // check if the student exists
            // const student = await this.#student_persistence.get_student(unit_title);
            // if (student === null) {
            //     return response.status(404).json({ message: "Student not found" });
            // }

            // check if the course exists
            const course = await this.#course_persistence.get_course(course_id);
            if (course === null) {
                return response.status(404).json({ message: "Course not found" });
            }


            // add the unit to the course
            const res = await this.#course_persistence.add_unit(unit_title, course_id);
            console.log(res);
            
            response.status(200).json({ message: "Unit added to course successfully" });
        } catch (error) {
            response.status(500).json({ message: error.message });  
        }
    }

    async get_course(request, response) {
        try {
            let course_id = request.params.id.trim().toLowerCase();
            const course = await this.#course_persistence.get_course(course_id);
            response.status(200).json({course});
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async get_students_in_course(request, response) {
        const { course_id } = request.params;
        try {
            // Fetch the students list from the course
            const student_list = await this.#course_persistence.get_students_in_course(course_id);
            
            if (!student_list || student_list.length === 0) {
                return response.status(404).json({ message: "No students found in this course" });
            }

            const students_info = [];
            for (let student_id of student_list) {
                const student = await this.#user_persistence.get_user(student_id);
                students_info.push(student);
            }
            return response.status(200).json({ students_info });

        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = CourseHandler;