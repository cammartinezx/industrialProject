const Services = require("../Utility/Services");
const { v4: uuidv4 } = require("uuid");
const {
    validateString,
    validateDate,
    validateUserExist,
    validateNonEmptyList,
} = require("../Utility/validator");

/**
 * @module Handler
 */

/**
 * Represents the  Instructor handler
 * @class
 *
 */
class InstructorHandler {
    /**
     * The user persistence object used by the info handler.
     * @type {string}
     * @private
     */
    #user_persistence;
 
    /**
     * The notificaion persistence object used by the info handler.
     * @type {string}
     * @private
     */
    #notification_persistence;

    /**
     * The instructor persistence object used by the info handler.
     * @type {string}
     * @private
     */
    #instructor_persistence;

    /**
     * Create a new  InstructorHandler object
     * @constructor
     */
    constructor() {
        this.#instructor_persistence = Services.get_instructor_persistence();
        this.#user_persistence = Services.get_user_persistence();
        this.#notification_persistence = Services.get_notification_persistence();
    }

    get_instructor_persistence() {
        return this.#instructor_persistence;
    }

    get_user_persistence() {
        return this.#user_persistence;
    }

    get_notification_persistence() {
        return this.#notification_persistence;
    }

    async create_instructor(request, response) {
        try {
            let user_id = request.params.id.trim().toLowerCase();
            let location = request.body.location?.trim().toLowerCase();
            let dob = request.body.dob?.trim().toLowerCase();
            let preferred_language = request.body.preferred_language?.trim().toLowerCase();
            let department = request.body.department?.trim().toLowerCase();

            try {
                validateString(user_id, "user");
                validateString(location, "location");
                validateDate(dob);
                validateString(preferred_language, "preferred language");
                validateString(department, "department");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }
        
            try {
                await validateUserExist(this.#user_persistence, user_id);
            } catch (error) {
                response.status(404).json({ message: error.message });
                return;
            }

            await this.#instructor_persistence.create_instructor(
                user_id,
                location,
                dob,
                preferred_language, 
                department,
            );

            return response.status(200).json({ message: "instructor created successfully" });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async update_instructor(request, response) {
        try {
            let user_id = request.params.id.trim().toLowerCase();
            let location = request.body.location?.trim().toLowerCase();
            let dob = request.body.dob?.trim().toLowerCase();
            let preferred_language = request.body.preferred_language?.trim().toLowerCase();
            let department = request.body.department?.trim().toLowerCase();
    
            // Synchronous validation
            try {
                validateString(user_id, "user");
                validateString(location, "location");
                validateDate(dob);
                validateString(preferred_language, "preferred language");
                validateString(department, "department");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }

            try {
                await validateUserExist(this.#user_persistence, user_id);
            } catch (error) {
                return response.status(404).json({ message: error.message });
            }
    
         
            let result = await this.#instructor_persistence.update_instructor(
                user_id,
                location,
                dob,
                preferred_language,
                department
            );
    
            if (result.status === 400) {
                return response.status(400).json({ message: result.message });
            }
    
            return response.status(200).json({ message: "Instructor updated successfully." });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
    
    async get_instructor(request, response) {
        try {
            let user_id = request.params.id.trim().toLowerCase();
    
            try {
                validateString(user_id, "user");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }
    
            try {
                await validateUserExist(this.#user_persistence, user_id);
            } catch (error) {
                return response.status(404).json({ message: error.message });
            }
    
            let instructor = await this.#instructor_persistence.get_instructor(user_id);
    
            if (!instructor) {
                return response.status(404).json({ message: "Instructor profile not found" });
            }
    
            return response.status(200).json({ instructor });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
    
    async get_courses_taught(request, response) {
        try {
            let user_id = request.params.id.trim().toLowerCase();
    
            // Validate user_id
            try {
                validateString(user_id, "user");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }
    
            // Check if user exists
            try {
                await validateUserExist(this.#user_persistence, user_id);
            } catch (error) {
                return response.status(404).json({ message: error.message });
            }
    
            // Fetch courses taught
            try {
                let courses_taught = await this.#instructor_persistence.get_courses_taught(user_id);
                return response.status(200).json({ courses_taught });
            } catch (error) {
                return response.status(404).json({ message: error.message });
            }
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async add_course(request, response) {
        try {
            let user_id = request.params.id.trim().toLowerCase();
            let course_id = request.body.course_id.trim().toLowerCase();
    
            // Validate input
            try {
                validateString(user_id, "user");
                validateString(course_id, "course");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }
    
            // Check if user exists
            try {
                await validateUserExist(this.#user_persistence, user_id);
            } catch (error) {
                return response.status(404).json({ message: error.message });
            }
    
            // Add course to instructor
            try {
                let result = await this.#instructor_persistence.add_course(user_id, course_id);
                return response.status(result.status).json({ message: result.message });
            } catch (error) {
                return response.status(500).json({ message: error.message });
            }
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = InstructorHandler;