const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

class InstructorPersistence {
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
        this.#table_name = "Instructor";
    }

    get_doc_client() {
        return this.#doc_client;
    }

    get_table_name() {
        return this.#table_name;
    }

    async create_instructor(user_id, location, preferred_language, dob, department) {
        try {
            console.log("valid 3");
            // Add the new instructor profile
            const put_command = new PutCommand({
                TableName: "Instructor",
                Item: {
                    user_id: user_id,
                    department: department,
                    dob: dob,
                    location: location,
                    preferred_language: preferred_language,
                },
                ConditionExpression: "attribute_not_exists(user_id)",
            });
    
            await this.#doc_client.send(put_command);
            return { status: 200, message: "Instructor profile successfully created" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 400, message: "This instructor profile already exists" };
            } else {
                throw error;
            }
        }
    }
    async update_instructor(user_id, department, preferred_language, dob, location) {
        const update_command = new UpdateCommand({
            TableName: "Instructor",
            Key: {
                user_id: user_id, // Partition key for the table
            },
            UpdateExpression: `
                set department = :department, 
                    preferred_language = :preferred_language, 
                    dob = :dob, 
                    location = :location
            `,
            ExpressionAttributeValues: {
                ":department": department,
                ":preferred_language": preferred_language,
                ":dob": dob,
                ":location": location,
            },
            ConditionExpression: "attribute_exists(user_id)", // Ensure the instructor exists
        });
    
        try {
            await this.#doc_client.send(update_command);
            return { status: 200, message: "Instructor profile successfully updated" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 400, message: "This instructor doesn't exist" };
            } else {
                throw error;
            }
        }
    } 
    async get_instructor(user_ID) {
        const get_command = new GetCommand({
            TableName: "Instructor",
            Key: {
                user_id: user_ID,
            },
        });
    
        const response = await this.#doc_client.send(get_command);
        let profile = response.Item;
        if (!profile) {
            return null;
        } else {
            return profile;
        }
    }
    async get_courses_taught(user_id) {
        const get_command = new GetCommand({
            TableName: "Instructor",
            Key: {
                user_id: user_id,
            },
        });

        const response = await this.#doc_client.send(get_command);
        

        let courses_taught = response.Item?.courses_taught;
        if (courses_taught===undefined) {
            throw new Error("Instructor doesn't have a course assigned yet");
        }
        return courses_taught;
    }
    async add_course(user_id, course_id) {
        try{
        const update_command = new UpdateCommand({
            TableName: this.#table_name,
            Key: { user_id: user_id },
            UpdateExpression: "ADD #courses_taught :new_course",
            ExpressionAttributeNames: {
                "#courses_taught": "courses_taught", 
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

module.exports = InstructorPersistence;