function validateString(name, type) {
    if (!name || typeof name !== "string" || name.length < 1) {
        throw new Error(`Invalid ${type}`);
    }
}

function validatePositiveInteger(value, type) {
    if (typeof value !== "number" || value <= 0) throw new Error(`Invalid ${type}- ${type} must be a positive number`);
}

function validateEmail(email) {
    if (!email || typeof email !== "string" || email.length < 1 || !email.includes("@")) {
        throw new Error("Invalid email");
    }
}

async function validateUserExist(user_persistence, userId) {
    let user = await user_persistence.get_user(userId);
    if (user === null) {
        throw new Error("User does not exist");
    } else {
        return user;
    }
}

module.exports = {
    validateString,
    validatePositiveInteger,
    validateEmail,
    validateUserExist,
};