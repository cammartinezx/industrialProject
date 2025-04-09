function validateString(name, type) {
    if (!name || typeof name !== "string" || name.length < 1) {
        throw new Error(`Invalid ${type}`);
    }
}

function validatePositiveNumber(value, type) {
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

async function validateCourseExist(course_persistence, courseId) {  
    let course = await course_persistence.get_course(courseId);
    if (course === null) {
        throw new Error("Course does not exist");
    } else {
        return course;
    }
}

async function validateStudentInCourse(course_persistence, courseId, studentId) {
    let course = await course_persistence.get_course(courseId);
    if (course === null) {
        throw new Error("Course does not exist");
    } else {
        let student_list = await course_persistence.get_students_in_course(courseId);
        if (student_list.includes(studentId)) {
            throw new Error("You already enrolled in this course!");
        }
    }
}

/**
 * Validate a date string.
 * @param {String} dateString "The date string to be validated in yyyy-MM-dd format"
 * @returns {Boolean} "True if valid date format and date is today or in the future, false otherwise"
 */
function validateDate(date) {
    // Regular expression to validate the format (yyyy-MM-dd)
    const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
    // Check if the date string matches the yyyy-MM-dd format
    if (!dateRegExp.test(date)) {
        throw new Error(`Invalid Date`);
    }
    // Parse the date string to a JavaScript Date object
    const inputDate = new Date(date);

    // Check if the parsed date is valid
    if (isNaN(inputDate.getTime())) {
        throw new Error(`Invalid Date`);
    }
    // Get today's date in yyyy-MM-dd format (ignore time part)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to only compare dates
    // Compare the input date with today's date
    if (inputDate > today) throw new Error(`Invalid Date`); // Returns false if inputDate is in the past
}

/**
 * Validate a list is non empty if empty throw error
 * @param {list} input_list "Input list of string"
 * @param {String} type "The type of the list- useful for error message"
 */
function validateNonEmptyList(input_list, type) {
    if (!Array.isArray(input_list) || input_list.length <= 0)
        throw new Error(`Invalid ${type}- ${type} must be a non empty list`);
}

module.exports = {
    validateString,
    validatePositiveNumber,
    validateEmail,
    validateUserExist,
    validateDate,
    validateNonEmptyList,
    validateCourseExist,
    validateStudentInCourse,
};