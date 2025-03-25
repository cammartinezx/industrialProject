const Services = require('../Utility/Services');
const { v4: uuidv4 } = require('uuid');
const { validateString } = require('../Utility/validator');
const e = require('express');

class ConversationHandler {

    #conversation_persistence;

    constructor() {
        this.#conversation_persistence = Services.get_conversation_persistence();
    }

    get_conversation_persistence() {
        return this.#conversation_persistence;
    }

    async add_message(request, response) {
        try {
            const conversation_id = uuidv4();
            const timestamp = this.getCanadianTimestamp();
            const user_role = request.body.user_role.trim();
            const message = request.body.message.trim();
            const edited_by = request.body.edited_by || null;
            const original_message = request.body.original_message || null;
            const unit = request.body.unit.trim();

            if (edited_by !== null || original_message !== null) {
                edited_by = edited_by.trim();
                original_message = original_message.trim();
            }

            try {
                validateString(user_role);
            } catch (error) {
                response.status(422).json({ message: error.message });
                return;
            }

            const result = await this.#conversation_persistence.add_message(conversation_id, timestamp, user_role, message, edited_by, original_message, unit);
            response.status(result.status).json({ message: result.message });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async update_message(request, response) {
        try {
            const conversation_id = request.params.id;
            const timestamp = this.getCanadianTimestamp();
            const message = request.body.message.trim();
            const edited_by = request.body.edited_by.trim();

            try {
                validateString(message);
                validateString(edited_by);
            } catch (error) {
                response.status(422).json({ message: error.message });
                return;
            }

            const result = await this.#conversation_persistence.update_message(conversation_id, timestamp, message, edited_by);
            response.status(result.status).json({ message: result.message });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async get_conversation(request, response) {
        try {
            const unit = request.body.unit.trim()
            const result = await this.#conversation_persistence.get_conversation(unit);
            response.status(result.status).json(result);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }


    getCanadianTimestamp(timeZone = 'America/Winnipeg') {
        const date = new Date();
        
        // Format the date for the specified time zone
        const formatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: timeZone, // Set the Canadian time zone
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false // Use 24-hour format
        });
        
        // Split into parts and construct the timestamp string
        const parts = formatter.formatToParts(date).reduce((acc, part) => {
          acc[part.type] = part.value;
          return acc;
        }, {});
        
        return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
    }
}

module.exports = ConversationHandler;