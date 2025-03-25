const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
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
  
}

module.exports = UserPersistence;