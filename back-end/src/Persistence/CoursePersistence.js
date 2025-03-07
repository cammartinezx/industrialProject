const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
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

    async get_course(course_id) {
        console.log("luker");
        const get_command = new GetCommand({
            TableName: this.table_name,
            Key: {
                course_id: course_id,
            },
        });
        
        const response = await this.#doc_client.send(get_command);
        let course = response.Item;
        if (student === undefined) {
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