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
        try {
            // Use UpdateExpression with SET instead of ADD to handle cases where the attribute doesn't exist yet
            const update_command = new UpdateCommand({
                TableName: "Instructor",
                Key: { user_id: user_id },
                UpdateExpression: "SET #courses_taught = list_append(if_not_exists(#courses_taught, :empty_list), :new_course)",
                ExpressionAttributeNames: {
                    "#courses_taught": "courses_taught", 
                },
                ExpressionAttributeValues: {
                    ":new_course": [course_id], // Single course as an array element
                    ":empty_list": [], // Empty list for initialization
                },
            });
            await this.#doc_client.send(update_command);
            return { status: 200, message: "course successfully added" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 404, message: "User not found" };
            } else {
                console.error("Error adding course:", error);
                return { status: 500, message: "Failed to add course: " + error.message };
            }
        }
    }
}

module.exports = InstructorPersistence;