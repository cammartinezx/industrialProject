const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, ScanCommand, UpdateCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

class CoursePersistence {
    #doc_client;

    table_name;

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
        this.table_name = "Course";
    }

    get_doc_client() {
        return this.#doc_client;
    }
    
    get_table_name() {
        return this.table_name;
    }

    async create_course(course_id, title, course_description, instructor_id) {
        try {
            const put_command = new PutCommand({
                TableName: this.table_name,
                Item: {  // Use "Item" instead of "Key"
                    course_id: course_id,
                    title: title,
                    description: course_description,
                    instructor: instructor_id,
                    student_list: [], // Initialize empty array if needed
                    unit_list: [] // Initialize empty array if needed
                },
                ConditionExpression: "attribute_not_exists(course_id)",
            });
    
            await this.#doc_client.send(put_command);
            return { status: 200, message: "Course successfully created" };
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return { status: 400, message: "This course already exists" };
            } else {
                throw error;
            }
        }
    }
    

    async get_course(course_id) {
        const get_command = new GetCommand({
            TableName: this.table_name,
            Key: {
                course_id: course_id,
            },
        });
        
        const response = await this.#doc_client.send(get_command);
        let course = response.Item;
        if (course === undefined) {
            return null;
        } else {
            return course;
        }
    }

    async get_courses() {
        try {
            const scan_command = new ScanCommand({
                TableName: this.table_name,
            });

            const data = await this.#doc_client.send(scan_command);
            return data.Items;  // Returns all rows
        } catch (error) {
            console.error(error);
            return { message: "Internal server error" };
        }
    }

    async add_student(student_id, course_id) {
        const update_command = new UpdateCommand({
            TableName: this.table_name,
            Key: {
                course_id: course_id,
            },
            UpdateExpression: "SET student_list = list_append(if_not_exists(student_list, :empty_list), :student)",
            ExpressionAttributeValues: {
                ":student": [student_id],
                ":empty_list": [],
            },
        });
    
        await this.#doc_client.send(update_command);
    }    
}

module.exports = CoursePersistence;