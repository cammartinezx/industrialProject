const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand, QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
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
        this.#table_name = "User";
    }

    get_doc_client() {
        return this.#doc_client;
    }

    get_table_name() {
        return this.#table_name;
    }

    async save_new_user(user_id, email, name, role) {
        try {
            // add the new user
            const put_command = new PutCommand({
                TableName: "User",
                Item: {
                    user_id: user_id,
                    email: email,
                    name: name,
                    role: role,
                },
                ConditionExpression: "attribute_not_exists(email)",
            });
            await this.#doc_client.send(put_command);
            const get_command = new GetCommand({
                TableName: "User",
                Key: {
                    user_id: user_id // Get the user by the user_id
                }
            });
    
            const response = await this.#doc_client.send(get_command);
            const createdUser = response.Item;
    
            // Return success status and the user data
            return { status: 200, message: "User Successfully created", data: createdUser };

        } catch (error) {
            console.error(error);
            if (error.code === "ConditionalCheckFailedException") {
                return { status: 409, message: "User already exists" };
            } else {
                return { status: 500, message: "Internal server error" };
            }
        }
    }


    async get_user(user_id) {
    
            const get_command = new GetCommand({
                TableName: "User",
                Key: {
                    user_id: user_id // Get the user by the user_id
                }
            });
    
            const response = await this.#doc_client.send(get_command);

        let user = response.Item;

        if (user === undefined) {
            return null;
        } else {
            return response.Item;
        }
    }

    async get_user_by_email(email) {
        try {
            
            const queryCommand = new QueryCommand({
                TableName: "User",
                IndexName: "email-index",  // Use the GSI
                KeyConditionExpression: "email = :emailValue",
                ExpressionAttributeValues: {
                    ":emailValue": email
                },
               
            });
           
            const response = await this.#doc_client.send(queryCommand);
            //console.log(response);
            return response.Items.length > 0 ? response.Items[0] : null;
        } catch (error) {
            //console.log(error);
    
        return { status: 500, message: "Internal server error" };
    
        }
    }

    /**
     * Updates the user notifications field with the new notification id
     * @param {String} notif_id "The unique identifier for the notification"
     * @param {String} user_id "The id for the user who now belongs to this notification"
     */
    async update_user_notifications(notif_id, user_id) {
        const update_command = new UpdateCommand({
            TableName: "User",
            Key: {
                user_id: user_id,
            },
            UpdateExpression: "SET #notif = list_append(if_not_exists(#notif, :empty_list), :notif_id)",
            ExpressionAttributeNames: {
                "#notif": "notification",
            },
            ExpressionAttributeValues: {
                ":notif_id": [notif_id], // Wrap notif_id in an array for appending to the list
                ":empty_list": [], // Handle the case where the notification attribute doesn't exist
            },
            ConditionExpression: "attribute_exists(user_id)", // Ensure the user exists
            ReturnValues: "NONE",
        });
        await this.#doc_client.send(update_command);
    }

    /**
     * Uses dynamodb GetCommand to get list of notification from existing user from database
     * @param {String} user_id "New user's name to be added to the database"
     * @returns {String} "Return list of notification or throw new error if no notification for exist user"
     */
    async get_notifications(user_id) {
        const get_command = new GetCommand({
            TableName: "User",
            Key: {
                user_id: user_id,
            },
        });
        const response = await this.#doc_client.send(get_command);

        let notification = response.Item.notification;
        if (notification === undefined) {
            // throw new Error(`User ${user_id} doesn't have a notification yet`);
            notification = [];
        }
        return notification;
    }
    
    /**
     * Gets all user IDs where role is "student"
     * @returns {Array} Array of student user IDs
     */
    async get_all_student_ids() {
        try {
            const scanCommand = new ScanCommand({
                TableName: "User",
                FilterExpression: "#role = :studentRole",
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":studentRole": "student"
                },
                ProjectionExpression: "user_id"
            });
            
            const response = await this.#doc_client.send(scanCommand);
            
            // Extract just the user_id values from the items
            const studentIds = response.Items.map(item => item.user_id);
            
            return studentIds;
        } catch (error) {
            console.error("Error fetching student IDs:", error);
            throw error;
        }
    }
  
}

module.exports = UserPersistence;