const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

class ConversationPersistence {
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
        this.#table_name = "Conversation";
    }

    get_doc_client() {
        return this.#doc_client;
    }

    get_table_name() {
        return this.#table_name;
    }

    async add_message(conversation_id, timestamp, user_role, message, edited_by, original_message, unit, user_id, course_id) {
        try {
            // add the new message
            const put_command = new PutCommand({
                TableName: this.#table_name,
                Item: {
                    conversation_id: conversation_id,
                    timestamp: timestamp,
                    user_role: user_role,
                    message: message,
                    edited_by: edited_by,
                    original_message: original_message,
                    unit: unit,
                    user_id: user_id,
                    course_id: course_id,
                },
            });
            await this.#doc_client.send(put_command);
            return { status: 200, message: "Message Successfully created" };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Internal server error" };
        }
    }

    async update_message(conversation_id, timestamp, new_message, edited_by, course_id) {
        try {
            // Retrieve the current message to set it as the original message
            const get_command = new GetCommand({
                TableName: this.#table_name,
                Key: {
                    conversation_id: conversation_id,
                },
            });
            const result = await this.#doc_client.send(get_command);
            const current_message = result.Item ? result.Item.message : null;
    
            // Update the message
            const update_command = new UpdateCommand({
                TableName: this.#table_name,
                Key: {
                    conversation_id: conversation_id,
                },
                UpdateExpression: "SET #msg = :new_message, edited_by = :edited_by, #ts = :timestamp, original_message = :original_message, course_id = :course_id",
                ExpressionAttributeNames: {
                    "#msg": "message",
                    "#ts": "timestamp"
                },
                ExpressionAttributeValues: {
                    ":new_message": new_message,
                    ":edited_by": edited_by,
                    ":timestamp": timestamp,
                    ":original_message": current_message,
                    ":course_id": course_id,
                },
            });
            await this.#doc_client.send(update_command);
            return { status: 200, message: "Message Successfully updated" };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Internal server error" };
        }
    }

    async get_conversation(course_id, unit) {
        try {
            const scan_command = new ScanCommand({
                TableName: this.#table_name,
                FilterExpression: "#unit = :unit AND #course_id = :course_id",
                ExpressionAttributeNames: {
                    "#unit": "unit",
                    "#course_id": "course_id",
                },
                ExpressionAttributeValues: {
                    ":unit": unit,
                    ":course_id": course_id,
                }
            });
            const response = await this.#doc_client.send(scan_command);
            if (response.Items) {
                // Sort the items by timestamp
                response.Items.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                return { status: 200, conversation: response.Items };
            } else {
                return { status: 404, message: "Conversation not found" };
            }
        } catch (error) {
            console.error(error);
            return { status: 500, message: error.message };
        }
    }

    async get_instructor_conversation(course_id, user_id) {
        try {
            const scan_command = new ScanCommand({
                TableName: this.#table_name,
                FilterExpression: "#course_id = :course_id AND #user_id = :user_id",
                ExpressionAttributeNames: {
                    "#course_id": "course_id",
                    "#user_id": "user_id",
                },
                ExpressionAttributeValues: {
                    ":course_id": course_id,
                    ":user_id": user_id,
                }
            });
            const response = await this.#doc_client.send(scan_command);
            if (response.Items) {
                // Sort the items by timestamp
                response.Items.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                return { status: 200, conversation: response.Items };
            } else {
                return { status: 404, message: "Conversation not found" };
            }
        } catch (error) {
            console.error(error);
            return { status: 500, message: error.message };
        }
    }
}

module.exports = ConversationPersistence;