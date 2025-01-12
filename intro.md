
# Node-Task-Queue-System
used nodemailer here

**Node-Task-Queue-System** is a basic task queue system built with Node.js. It allows users to add tasks to a queue and process them one by one. This project is ideal for understanding the basics of handling asynchronous tasks in a web application.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Task Queueing**: Users can add tasks to a queue, which are processed one at a time.
- **Task Management**: Track task status (pending, processing, completed).
- **Basic Error Handling**: If a task fails, it's marked as failed.

## Technologies

- **Node.js**: Server-side runtime for handling asynchronous tasks.
- **Express**: Web framework for building RESTful APIs.
- **In-Memory Queue**: Simple queue implemented using in-memory data structures (arrays).

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/Node-Task-Queue-System.git
   cd Node-Task-Queue-System
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   The server will be running on `http://localhost:3000`.

## Usage

### Adding Tasks
You can add tasks to the queue via a POST request to `/tasks`. Tasks will be processed in the order they are received.

Example:
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"task": "Send email to user"}'
```

### Monitoring Tasks
You can view the current status of tasks by making a GET request to `/tasks`.

Example:
```bash
curl http://localhost:3000/tasks
```

## Project Structure

```bash
.
├── controllers
│   └── taskController.js # Logic for handling task queue operations
├── routes
│   └── taskRoutes.js     # API routes for task management
├── app.js                # Main application entry point
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## API Endpoints

- **POST** `/tasks`
  - Add a new task to the queue.
  - **Request Body**:
    ```json
    {
      "task": "Some task description"
    }
    ```

- **GET** `/tasks`
  - Get the current list of tasks and their statuses.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
