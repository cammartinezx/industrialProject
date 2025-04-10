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
    async add_unit(unit_title, courseID) {
        const update_command = new UpdateCommand({
            TableName: this.table_name,
            Key: {
                course_id: courseID,
            },
            UpdateExpression: "SET unit_list = list_append(if_not_exists(unit_list, :empty_list), :unit)",
            ExpressionAttributeValues: {
                ":unit": [unit_title],
                ":empty_list": [],
            },
        });

        try {
            console.log("Executing DynamoDB update...");
            const response = await this.#doc_client.send(update_command);
            console.log("Update successful:", response);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    }     
    

    async get_students_in_course(course_id) {
        const get_command = new GetCommand({
            TableName: this.table_name,
            Key: {
                course_id: course_id,
            },
            ProjectionExpression: "student_list",
        });
        
        const response = await this.#doc_client.send(get_command);
        return response.Item?.student_list || [];
    }

    async get_instructor(course_id) {
        const get_command = new GetCommand({
            TableName: this.table_name,
            Key: {
                course_id: course_id,
            },
            ProjectionExpression: "instructor",
        });
        
        const response = await this.#doc_client.send(get_command);
        return response.Item?.instructor || null;
    }

    async add_prompt(course_id, title, description) {
        const promptObject = {
          title,
          description,
        };
      
        const update_command = new UpdateCommand({
          TableName: this.table_name,
          Key: {
            course_id: course_id,
          },
          UpdateExpression:
            "SET prompt_list = list_append(if_not_exists(prompt_list, :empty_list), :prompt)",
          ExpressionAttributeValues: {
            ":prompt": [promptObject],
            ":empty_list": [],
          },
        });
      
        await this.#doc_client.send(update_command);
      }
      
      async update_prompt(course_id, prompt_index, title, description) {
        const promptObject = {
          title,
          description,
        };
      
        const update_command = new UpdateCommand({
          TableName: this.table_name,
          Key: {
            course_id: course_id,
          },
          UpdateExpression: `SET prompt_list[${prompt_index}] = :prompt`,
          ExpressionAttributeValues: {
            ":prompt": promptObject,
          },
        });
      
        try {
          await this.#doc_client.send(update_command);
          return { status: 200, message: "Prompt successfully updated" };
        } catch (error) {
          console.error("Error updating prompt:", error);
          return { status: 500, message: "Failed to update prompt" };
        }
      }
      
      async get_prompts(course_id) {
        const get_command = new GetCommand({
          TableName: this.table_name,
          Key: { course_id },
          ProjectionExpression: "prompt_list",
        });
      
        const response = await this.#doc_client.send(get_command);
        const promptList = response.Item?.prompt_list || [];
      
        // Return array of { title, description, index }
        return promptList.map((prompt, index) => ({
          title: prompt.title,
          description: prompt.description,
          index,
        }));
      }
      
}

module.exports = CoursePersistence;