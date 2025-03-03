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
}

module.exports = CoursePersistence;