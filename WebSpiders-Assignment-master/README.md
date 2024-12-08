# Task Management API

A RESTful API for managing tasks, built with **Node.js**, **Express.js**, and **MongoDB**. This API provides endpoints for task creation, retrieval, updating, and deletion, along with user authentication for secure access.

---

## **Features**
- CRUD operations for tasks
- Pagination, sorting, and filtering for task retrieval
- User authentication (JWT-based)
- Input validation using **Joi**
- Modular and scalable project structure

---

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JSON Web Token (JWT)

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/anil-app-cloud/WebSpiders-Assignment.git
##**API Collection**

POST http://localhost:3000/register
Content-Type: application/json

{
    "username": "anilkumar",
    "password": "123456"
}

###
POST http://localhost:3000/login
Content-Type: application/json

{
    "username": "anil",
    "password": "123456"
}

###

POST http://localhost:3000/tasks
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

{
  "title": "listing 2",
  "description": "Invite users to test the new feature and gather feedback for improvements.",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-14T16:00:00.000Z"
}

###
GET http://localhost:3000/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

###
GET http://localhost:3000/tasks/675423af8d05de49e214cc40
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

###

GET http://localhost:3000/tasks?status=TODO
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

###
GET http://localhost:3000/tasks?status=IN_PROGRESS&priority=HIGH
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

###
GET http://localhost:3000/tasks?priority=MEDIUM&limit=5
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

###

PUT http://localhost:3000/tasks/6754240c8d05de49e214cc46
Content-Type: application/json 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8

{
    "title": "Client presentation completed",
    "description": "Invite users to test the new feature and gather feedback for improvements.",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-14T16:00:00.000Z",
    "createdAt": "2024-12-07T06:03:27.174Z",
    "updatedAt": "2024-12-07T06:03:27.174Z",
    "__v": 0
}

###

DELETE http://localhost:3000/tasks/675443de4886a2af15a950b5
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWwiLCJpZCI6IjY3NTQ0MzM0NDg4NmEyYWYxNWE5NTBhZCIsImlhdCI6MTczMzU3NTQ4MX0.VF0KyjqEJFNvjbfTAqZ3zTwySoo3mtUVYLX1W4fNAx8
###



