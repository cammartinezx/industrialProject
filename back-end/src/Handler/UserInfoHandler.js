const Services = require('../Utility/Services');
const { v4: uuidv4 } = require('uuid');
const { validateString, validateEmail, validateUserExist } = require('../Utility/validator');

class UserInfoHandler {

    #user_persistence;

    constructor() {
        this.#user_persistence = Services.get_user_persistence();
    }

    get_user_persistence() {
        return this.#user_persistence;
    }


    async create_user(request, response) {
        try{
            const email = request.body.email.trim();
            const name = request.body.name.trim();
            const role = request.body.role.trim();

            try {
                validateString(name, "name");
                validateEmail(email);
                validateString(role, "role");
            } catch (error) {
                response.status(422).json({ message: error.message });
                return;
            }

            const user_id = uuidv4();
            const result = await this.#user_persistence.save_new_user(user_id, email, name, role);
            response.status(result.status).json({ message: result.message });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = UserInfoHandler;