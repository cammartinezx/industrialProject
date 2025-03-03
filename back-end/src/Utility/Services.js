const UserPersistence = require('../Persistence/UserPersistence');
const CoursePersistence = require('../Persistence/CoursePersistence');

class Services {
    static #user_persistence = null;
    static #course_persistence = null;

    static get_user_persistence() {
        if (this.#user_persistence === null) {
            this.#user_persistence = new UserPersistence();
        }
        return this.#user_persistence;
    }

    static get_course_persistence() {
        if (this.#course_persistence === null) {
            this.#course_persistence = new CoursePersistence();
        }
        return this.#course_persistence;
    }
}

module.exports = Services;