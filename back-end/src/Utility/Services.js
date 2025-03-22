const UserPersistence = require('../Persistence/UserPersistence');
const InstructorPersistence = require('../Persistence/InstructorPersistence');
const StudentPersistence = require('../Persistence/StudentPersistence');
const NotificationPersistence = require('../Persistence/NotificationPersistence');
const CoursePersistence = require('../Persistence/CoursePersistence');
const ConversationPersistence = require('../Persistence/ConversationPersistence');

class Services {
    static #user_persistence = null;
    static #instructor_persistence = null;
    static #student_persistence = null;
    static #notification_persistence = null;
    static #course_persistence = null;
    static #conversation_persistence = null;
    

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
    static get_notification_persistence() {
        if (this.#notification_persistence === null) {
            this.#notification_persistence = new NotificationPersistence();
        }
        return this.#notification_persistence;
    }

    static get_course_persistence() {
        if (this.#course_persistence === null) {
            this.#course_persistence = new CoursePersistence();
        }
        return this.#course_persistence;
    }

    static get_conversation_persistence() {
        if (this.#conversation_persistence === null) {
            this.#conversation_persistence = new ConversationPersistence();
        }
        return this.#conversation_persistence;
    }
   
   
}

module.exports = Services;