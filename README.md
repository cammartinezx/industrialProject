# Industrial Project - EduNova (Web-Based Training Platform)

## Project Overview
This project was developed for the **Government of Canada** to provide a **web-based training platform** that allows employees (students) to engage with instructors and/or chatbots in **text-based role-play exercises**. The system is designed with three core components:

1. **Instructor (Admin Panel)**
   - Set up and manage role-play exercises.
   - View full conversation history for grading.
   - Take control of conversations when needed.
   - Save and reuse scenario templates.
   
2. **Student (User-Facing Web System)**
   - Students engage in role-based exercises.
   - Respond to chat prompts during training sessions.

3. **Nova (Chatbot System)**
   - Uses admin-configured scenarios to interact with students.
   - Can substitute instructors dynamically during exercises.

### Key Features
- **Reporting & Auditability**: Track and store conversation histories.
- **Instructor Integration**: Instructors can join and leave role-play sessions as needed.
- **Scenario Reusability**: Admins can create and reuse predefined scenarios.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js
- **Database**: DynamoDB
- **Chatbot**: Ollama, Llama
- **Hosting**: AWS, Google Cloud Services

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/cammartinezx/industrialProject.git
   ```
2. Open two terminals and navigate to the project directory:
   - **Terminal 1 (Frontend)**:
     ```sh
     cd industrialProject/front-end/src
     ```
   - **Terminal 2 (Backend)**:
     ```sh
     cd industrialProject/back-end/src
     ```
3. Install dependencies in both terminals:
   ```sh
   npm install
   ```
4. Run the backend:
   ```sh
   node index.js
   ```
5. Run the frontend:
   ```sh
   npm run dev
   ```

## Usage
- Instructors can create and manage role-play scenarios.
- Students can participate in interactive training sessions.
- Nova assists students and enables seamless role-play exercises.

## Contributors
- Camila Martinez Ovando 
- Hung Lu Dao
- Dhvani Romesh Thakkar
