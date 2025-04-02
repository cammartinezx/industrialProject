const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    UpdateCommand,
    PutCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const Services = require("../Utility/Services");
require("dotenv").config();

/**
 * @module Persistence
 */

/**
 * Represents the notification persistence layer that is linked to the notification table in the database
 * @class
 */

class NotificationPersistence {
    // document client to dynamo db and table name to reference the table.
    /**
     * The connection with the dynamodb client
     * @type {DynamoDBClient}
     * @private
     */
    #doc_client;
    /**
     * The name of the notification table in the backend
     */
    #table_name;

    /**
     * Create a new NotificationPersistence object
     * @constructor
     */
    constructor() {
        // check if test is running
        const isTest = process.env.JEST_WORKER_ID;

        const remote_client = {
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        };

        const local_test_client = {
            region: "local-env",
            endpoint: "http://localhost:8000",
            sslEnabled: false,
            convertEmptyValues: true,
            credentials: {
                accessKeyId: "fakeMyKeyId", // Dummy key
                secretAccessKey: "fakeSecretAccessKey", // Dummy secret
            },
        };

        let working_client;
        if (isTest) {
            working_client = new DynamoDBClient(local_test_client);
        } else {
            working_client = new DynamoDBClient(remote_client);
        }

        this.#doc_client = DynamoDBDocumentClient.from(working_client);
        this.#table_name = "notifications";
    }

    get_doc_client() {
        return this.#doc_client;
    }

    get_table_name() {
        return this.#table_name;
    }


    async get_notif_details(notif_id) {
        const get_command = new GetCommand({
            TableName: "Notification",
            Key: {
                notification_id: notif_id,
            },
        });
        const response = await this.#doc_client.send(get_command);

        let message = response.Item.message;
        let type = response.Item.type;
        let from = response.Item.from;
        let to = response.Item.to;
        let course = response.Item.course;
        let status = response.Item.status;
        if (message === undefined || message === "") {
            throw new Error("Notification doesn't have a message");
        }

        return { notification_id: notif_id, msg: message, type: type, from: from, to: to , course: course, status: status };
    }

    async generate_new_notification(notif_id, msg, status, from, to, course, type) {
        try {
            // add the new notification
            const put_command = new PutCommand({
                TableName: "Notification",
                Item: {
                    notification_id: notif_id,
                    message: msg,
                    from: from,
                    status: status,
                    to: to,
                    course: course,
                    type: type,
                },
                ConditionExpression: "attribute_not_exists(notification_id)",
            });

            await this.#doc_client.send(put_command);
            return "SUCCESS";
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                return "FAILED";
            } else {
                throw error;
            }
        }
    }

    async update_notification_status(notif_id) {
        const update_command = new UpdateCommand({
            TableName: "Notification",
            Key: {
                notification_id: notif_id,
            },
            UpdateExpression: "SET #status = :new_status",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":new_status": "read", // Update the status to 'read'
            },
            ConditionExpression: "attribute_exists(id)",
            ReturnValues: "NONE",
        });

        await this.#doc_client.send(update_command);
    }

    async delete_notification(notification_id) {
        const delete_command = new DeleteCommand({
            TableName: "Notification",
            Key: {
                id: notification_id,
            },
        });

        await this.#doc_client.send(delete_command);
    }

    async get_unread_notifications(notif_id) {
        const get_command = new GetCommand({
            TableName: "Notification",
            Key: {
                id: notif_id,
            },
        });

        try {
            const response = await this.#doc_client.send(get_command);

            // extract the fields
            const message = response.Item.message;
            const type = response.Item.type;
            const status = response.Item.status;

            // Ensure it's unread
            if (status !== "unread") {
                return "ok";
            } else {
                return { msg: message, type: type, status: status };
            }
        } catch (error) {
            throw new Error("Back end error, fail to get notification");
        }
    }
}

module.exports = NotificationPersistence;
