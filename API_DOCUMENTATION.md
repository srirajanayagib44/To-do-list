# Todo List Application - API Documentation

## Base URL
```
http://localhost:8080/api
```

## Response Format
All responses are in JSON format.

### Success Response (200 OK)
```json
{
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "joinDate": "2024-01-15T10:30:00"
}
```

### Error Response (400/404/500)
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## User Endpoints

### 1. Create User
**POST** `/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890"
}
```

**Response (201 Created):**
```json
{
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "joinDate": "2024-01-15T10:30:00"
}
```

### 2. Get All Users
**GET** `/users`

**Response (200 OK):**
```json
[
  {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "1234567890",
    "joinDate": "2024-01-15T10:30:00"
  },
  {
    "userId": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "contact": "0987654321",
    "joinDate": "2024-01-16T11:45:00"
  }
]
```

### 3. Get User by ID
**GET** `/users/{id}`

**Response (200 OK):**
```json
{
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "joinDate": "2024-01-15T10:30:00"
}
```

### 4. Update User
**PUT** `/users/{id}`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "contact": "9876543210"
}
```

**Response (200 OK):**
```json
{
  "userId": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "contact": "9876543210",
  "joinDate": "2024-01-15T10:30:00"
}
```

### 5. Delete User
**DELETE** `/users/{id}`

**Response (204 No Content)**

---

## Task Endpoints

### 1. Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Complete project",
  "description": "Finish the Spring Boot project",
  "priority": "HIGH",
  "status": "PENDING",
  "dueDate": "2024-12-31T23:59:59"
}
```

**Response (201 Created):**
```json
{
  "taskId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "Complete project",
  "description": "Finish the Spring Boot project",
  "priority": "HIGH",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "dueDate": "2024-12-31T23:59:59",
  "tags": []
}
```

### 2. Get All Tasks
**GET** `/tasks`

**Response (200 OK):**
```json
[
  {
    "taskId": 1,
    "userId": 1,
    "userName": "John Doe",
    "title": "Complete project",
    "description": "Finish the Spring Boot project",
    "priority": "HIGH",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00",
    "dueDate": "2024-12-31T23:59:59",
    "tags": [
      {
        "tagId": 1,
        "name": "Work",
        "description": "Work-related tasks"
      }
    ]
  }
]
```

### 3. Get Task by ID
**GET** `/tasks/{id}`

**Response (200 OK):**
```json
{
  "taskId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "Complete project",
  "description": "Finish the Spring Boot project",
  "priority": "HIGH",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "dueDate": "2024-12-31T23:59:59",
  "tags": []
}
```

### 4. Update Task
**PUT** `/tasks/{id}`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS",
  "dueDate": "2024-12-25T23:59:59"
}
```

**Response (200 OK):**
```json
{
  "taskId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-15T10:30:00",
  "dueDate": "2024-12-25T23:59:59",
  "tags": []
}
```

### 5. Delete Task
**DELETE** `/tasks/{id}`

**Response (204 No Content)**

### 6. Assign Tags to Task
**POST** `/tasks/{id}/tags`

**Request Body:**
```json
[1, 2, 3]
```

**Response (200 OK):**
```json
{
  "taskId": 1,
  "userId": 1,
  "userName": "John Doe",
  "title": "Complete project",
  "description": "Finish the Spring Boot project",
  "priority": "HIGH",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "dueDate": "2024-12-31T23:59:59",
  "tags": [
    {
      "tagId": 1,
      "name": "Work",
      "description": "Work-related tasks"
    },
    {
      "tagId": 2,
      "name": "Urgent",
      "description": "Urgent tasks"
    }
  ]
}
```

### 7. Search Tasks
**GET** `/tasks/search?tag=Work&priority=HIGH&status=PENDING`

**Query Parameters:**
- `tag` (optional): Filter by tag name
- `priority` (optional): Filter by priority (LOW, MEDIUM, HIGH)
- `status` (optional): Filter by status (PENDING, IN_PROGRESS, COMPLETED)

**Response (200 OK):**
```json
[
  {
    "taskId": 1,
    "userId": 1,
    "userName": "John Doe",
    "title": "Complete project",
    "priority": "HIGH",
    "status": "PENDING",
    "tags": [
      {
        "tagId": 1,
        "name": "Work"
      }
    ]
  }
]
```

---

## Tag Endpoints

### 1. Create Tag
**POST** `/tags`

**Request Body:**
```json
{
  "name": "Work",
  "description": "Work-related tasks"
}
```

**Response (201 Created):**
```json
{
  "tagId": 1,
  "name": "Work",
  "description": "Work-related tasks"
}
```

### 2. Get All Tags
**GET** `/tags`

**Response (200 OK):**
```json
[
  {
    "tagId": 1,
    "name": "Work",
    "description": "Work-related tasks"
  },
  {
    "tagId": 2,
    "name": "Personal",
    "description": "Personal tasks"
  }
]
```

### 3. Get Tag by ID
**GET** `/tags/{id}`

**Response (200 OK):**
```json
{
  "tagId": 1,
  "name": "Work",
  "description": "Work-related tasks"
}
```

### 4. Update Tag
**PUT** `/tags/{id}`

**Request Body:**
```json
{
  "name": "Work Updated",
  "description": "Updated work tasks"
}
```

**Response (200 OK):**
```json
{
  "tagId": 1,
  "name": "Work Updated",
  "description": "Updated work tasks"
}
```

### 5. Delete Tag
**DELETE** `/tags/{id}`

**Response (204 No Content)**

---

## Report Endpoints

### 1. Get Pending Tasks
**GET** `/reports/pending-tasks`

**Response (200 OK):**
```json
[
  {
    "taskId": 1,
    "userId": 1,
    "userName": "John Doe",
    "title": "Complete project",
    "priority": "HIGH",
    "status": "PENDING",
    "tags": []
  }
]
```

### 2. Get Completed Tasks
**GET** `/reports/completed-tasks`

**Response (200 OK):**
```json
[
  {
    "taskId": 2,
    "userId": 1,
    "userName": "John Doe",
    "title": "Completed task",
    "priority": "LOW",
    "status": "COMPLETED",
    "tags": []
  }
]
```

---

## Priority Values
- `LOW` - Low priority
- `MEDIUM` - Medium priority (default)
- `HIGH` - High priority

## Status Values
- `PENDING` - Task is pending (default)
- `IN_PROGRESS` - Task is in progress
- `COMPLETED` - Task is completed

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content to return |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Example cURL Commands

### Create User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","contact":"1234567890"}'
```

### Get All Tasks
```bash
curl http://localhost:8080/api/tasks
```

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"title":"My Task","priority":"HIGH","status":"PENDING"}'
```

### Search Tasks by Priority
```bash
curl "http://localhost:8080/api/tasks/search?priority=HIGH"
```

### Update Task Status
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"title":"My Task","priority":"HIGH","status":"COMPLETED"}'
```

---

**Last Updated:** January 2024

