const Services = require("../Utility/Services");
const { v4: uuidv4 } = require("uuid");
const {
    validateString,
    validateDate,
    validateUserExist,
    validateNonEmptyList,
} = require("../Utility/validator");



class NotificationHandler {
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


    /**
     * Add a new notification to the persistence Layer
     * @async
     * @param {Express.request} request "Request received by the router"
     * @param {Express.response} response "Response to be sent back to the service that sent the original request"
     */
    async create_notification(request, response) {
        try {
            const notif_id = uuidv4();
            const status = "unread";
            const from = request.body.from;
            const to = request.body.to;
            const type = request.body.type;
            const course = request.body.course;

            try {
                validateString(from, "user from");
                validateString(to, "user to");
                validateString(course, "course");
            } catch (error) {
                return response.status(422).json({ message: error.message });
            }

            try {
                await validateUserExist(this.#user_persistence, from);
                await validateUserExist(this.#user_persistence, to);
            } catch (error) {
                response.status(404).json({ message: error.message });
                return;
            }

            const msg = this.generate_message(senderName, type, course);

            try {
                validateString(msg);
            } catch (error) {
                return response.status(400).json({ message: "Error Creating Notification - Message is empty" });
            }

            let new_notification_status = await this.#notification_persistence.generate_new_notification(
                notif_id,
                msg,
                status,
                from,
                to,
                course,
                type,
            );

            if (new_notification_status === "SUCCESS") {
    
                await this.#user_persistence.update_user_notifications(notif_id, to);
                return response.status(200).json({ message: "Successfully Created the new notification" });
            } else {
                return response.status(500).json({ message: "Retry creating the notification" });
            }
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    /**
     * Create a message based on sender, receiver and type
     * @param {String} from "a sender ID"
     * @param {String} type "a type of notification, for now we just have invite"
     * @param {String} course "a type of notification, for now we just have invite"
     * @returns {String} "notification message"
     */
    generate_message(from, type, course) {
        if (type === "join-request") {
            return `${from} requests to join the class ${course} `;
        } else if (type === "help-request") {
            return `${from} is requesting your help for ${course} `;
        }else{
            return "";
        }
        
    }

}

module.exports = NotificationHandler;