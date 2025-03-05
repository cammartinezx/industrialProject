const UserPersistence = require('../Persistence/UserPersistence');
const InstructorPersistence = require('../Persistence/InstructorPersistence');
const StudentPersistence = require('../Persistence/StudentPersistence');

class Services {
    static #user_persistence = null;
    static #instructor_persistence = null;
    static #student_persistence = null;

    static get_user_persistence() {
        if (this.#user_persistence === null) {
            this.#user_persistence = new UserPersistence();
        }
        return this.#user_persistence;
    }
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
   
}

module.exports = Services;