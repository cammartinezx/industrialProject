const UserPersistence = require('../Persistence/UserPersistence');
<<<<<<< HEAD
const CoursePersistence = require('../Persistence/CoursePersistence');

class Services {
    static #user_persistence = null;
    static #course_persistence = null;
=======
const InstructorPersistence = require('../Persistence/InstructorPersistence');
const StudentPersistence = require('../Persistence/StudentPersistence');

class Services {
    static #user_persistence = null;
    static #instructor_persistence = null;
    static #student_persistence = null;
>>>>>>> CMO_Persistance

    static get_user_persistence() {
        if (this.#user_persistence === null) {
            this.#user_persistence = new UserPersistence();
        }
        return this.#user_persistence;
    }
<<<<<<< HEAD

    static get_course_persistence() {
        if (this.#course_persistence === null) {
            this.#course_persistence = new CoursePersistence();
        }
        return this.#course_persistence;
    }
=======
    static get_instructor_persistence() {
        if (this.#instructor_persistence === null) {
            this.#instructor_persistence = new InstructorPersistence();
        }
        return this.#instructor_persistence;
    }
    static get_student_persistence() {
        if (this.#student_persistence === null) {
            this.#student_persistence = new StudentPersistence();
        }
        return this.#student_persistence;
    }
   
>>>>>>> CMO_Persistance
}

module.exports = Services;