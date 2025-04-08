const Services = require('../Utility/Services');
const { v4: uuidv4 } = require("uuid");
const { validateString } = require('../Utility/validator');

class CourseHandler {
    
    #course_persistence;
    #student_persistence;
    #instructor_persistence;
    #user_persistence;
    #notification_persistence;

    constructor() {
        this.#course_persistence = Services.get_course_persistence();
        this.#student_persistence = Services.get_student_persistence();
        this.#instructor_persistence = Services.get_instructor_persistence();
        this.#user_persistence = Services.get_user_persistence();
        this.#notification_persistence = Services.get_notification_persistence();
    }

    get_course_persistence() {
        return this.#course_persistence;
    }

    async create_course(request, response) {
        try {
            let course_id = request.body.id.trim().toLowerCase();
            const title = request.body.title.trim();
            const course_description = request.body.description.trim();
            const instructor_id = request.body.instructor_id;
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
            // add course_id into instructor's course_taught
            await this.#instructor_persistence.add_course(instructor_id, course_id);

            // update notification for all students
            const student_ids = await this.#user_persistence.get_all_student_ids();
            for (let student_id of student_ids) {
                const notification_id = uuidv4();
                let item = await this.#user_persistence.get_user(instructor_id);
                const sender_name = item.name;
                const message = `New course ${title} has been created by ${sender_name}. You can now enroll in the course with the code ${course_id}.`;
                // create notification
                await this.#notification_persistence.generate_new_notification(
                    notification_id,
                    message,
                    "unread",
                    instructor_id,
                    student_id,
                    course_id,
                    "course-created",
                );
                // update user's notification
                await this.#user_persistence.update_user_notifications(notification_id, student_id);
            }
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

    async get_instructor_of_course(request, response) {
        const { course_id } = request.params;
        try {
            // Fetch the instructor id from the course
            const instructor_id = await this.#course_persistence.get_instructor(course_id);
            
            if (!instructor_id) {
                return response.status(404).json({ message: "Instructor not found for this course" });
            }

            return response.status(200).json({ instructor_id });

        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async add_prompt(request, response) {
        const course_id = request.body.course_id;
        const title = request.body.title.trim().toLowerCase();
        const description = request.body.description.trim().toLowerCase();
        try {
            // Fetch the instructor id from the course
            const instructor_id = await this.#course_persistence.get_instructor(course_id);
            
            if (!instructor_id) {
                return response.status(404).json({ message: "Instructor not found for this course" });
            }

            // Add the prompt to the course
            await this.#course_persistence.add_prompt(course_id, title, description);

            return response.status(200).json({ message: "Prompt added successfully" });

        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async update_prompt(request, response) {
        const course_id = request.body.course_id;
        const prompt_index = request.body.prompt_index;
        const title = request.body.title.trim().toLowerCase();
        const description = request.body.description.trim().toLowerCase();
        try {
            await this.#course_persistence.update_prompt(course_id, prompt_index, title, description);
            return response.status(200).json({ message: "Prompt updated successfully" });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async get_prompts(request, response) {
        const course_id = request.params.course_id;
        try {
            const prompts = await this.#course_persistence.get_prompts(course_id);
            return response.status(200).json({ prompts });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = CourseHandler;