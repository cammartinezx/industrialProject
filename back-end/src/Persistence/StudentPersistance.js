const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

class UserPersistence {
    #doc_client;

    #table_name;

    constructor() {
        
        const remote_client = {
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        };

        let working_client = new DynamoDBClient(remote_client);
        this.#doc_client = DynamoDBDocumentClient.from(working_client);
        this.#table_name = "users";
    }

    get_doc_client() {
        return this.#doc_client;
    }

    get_table_name() {
        return this.#table_name;
    }

    async create_student(user_id, degree, dob, gpa, preferred_learning_style, preferred_language, location) {
        try {
            // Add the new student profile
            const put_command = new PutCommand({
                TableName: "Student",
                Item: {
                    user_id: user_id,
                    degree: degree,
                    dob: dob,
                    gpa: gpa,
                    preferred_learning_style: preferred_learning_style,
                    preferred_language: preferred_language,
                    location: location,
                },
                ConditionExpression: "attribute_not_exists(user_id)",
            });
    
            await this.#doc_client.send(put_command);
            return { status: 200, message: "Student profile successfully created" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 400, message: "This student profile already exists" };
            } else {
                throw error;
            }
        }
    }
    
    async update_student(user_id, degree, dob, gpa, preferred_learning_style, preferred_language, location) {
        const update_command = new UpdateCommand({
            TableName: "Student",
            Key: {
                user_id: user_id, // Partition key for the table
            },
            UpdateExpression: `
                set degree = :degree, 
                    dob = :dob, 
                    gpa = :gpa, 
                    preferred_learning_style = :preferred_learning_style, 
                    preferred_language = :preferred_language, 
                    location = :location
            `,
            ExpressionAttributeValues: {
                ":degree": degree,
                ":dob": dob,
                ":gpa": gpa,
                ":preferred_learning_style": preferred_learning_style,
                ":preferred_language": preferred_language,
                ":location": location,
            },
            ConditionExpression: "attribute_exists(user_id)",
        });
    
        try {
            await this.#doc_client.send(update_command);
            return { status: 200, message: "Student profile successfully updated" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 400, message: "This student doesn't exist" };
            } else {
                throw error;
            }
        }
    }
    
    async get_student(user_id) {
        const get_command = new GetCommand({
            TableName: "Student",
            Key: {
                user_id: user_id,
            },
        });
    
        const response = await this.#doc_client.send(get_command);
        let student = response.Item;
        if (student === undefined) {
            return null;
        } else {
            return student;
        }
    }
    
    async get_courses_enrolled(user_id) {
        const get_command = new GetCommand({
            TableName: "Student",
            Key: {
                user_id: user_id,
            },
        });
    
        const response = await this.#doc_client.send(get_command);
    
        let courses_enrolled = response.Item?.courses_enrolled;
        if (courses_enrolled === undefined) {
            courses_enrolled = [];
        }
    
        return courses_enrolled;
    }

    async add_course(user_id, course_id) {
        try{
        const update_command = new UpdateCommand({
            TableName: this.#table_name,
            Key: { user_id: user_id },
            UpdateExpression: "ADD #courses_enrolled :new_course",
            ExpressionAttributeNames: {
                "#courses_enrolled": "courses_enrolled", 
            },
            ExpressionAttributeValues: {
                ":new_course": new Set([course_id]), // The course to add as a single-element list
            },
        });
        await this.#doc_client.send(update_command);
        return { status: 200, message: "course successfully added" };
    }catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return { status: 400, message: "User not found" };
        } else {
            throw error;
        }
    }

    }
    
}

module.exports = UserPersistence;