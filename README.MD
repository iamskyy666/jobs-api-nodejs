# Jobs API

## Live API

Base URL:
https://jobs-api-nodejs.onrender.com/api/v1

A secure RESTful API built with Node.js, Express, MongoDB, and JWT Authentication that allows users to manage their job search activities.

Each user can create, view, update, and delete their own job records after authenticating with JSON Web Tokens (JWT).

---

## Features

* User Registration
* User Login & Authentication
* Password Hashing with bcrypt
* JWT-Based Authorization
* Protected Routes
* Create Job Records
* View All Jobs
* View Single Job
* Update Existing Jobs
* Delete Jobs
* User-Specific Data Access
* Global Error Handling
* Rate Limiting
* Security Headers with Helmet
* Cross-Origin Resource Sharing (CORS)
* MongoDB Validation
* Duplicate Email Protection

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* helmet
* cors
* express-rate-limit

### Utilities

* dotenv
* http-status-codes
* validator
* nodemon

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/v1/auth/register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "User registered successfully",
  "user": {
    "name": "John Doe"
  },
  "token": "JWT_TOKEN"
}
```

---

#### Login User

```http
POST /api/v1/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Logged-In successfully",
  "user": {
    "name": "John Doe"
  },
  "token": "JWT_TOKEN"
}
```

---

### Jobs

All Jobs routes require a valid JWT.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

#### Create Job

```http
POST /api/v1/jobs
```

Request Body:

```json
{
  "company": "Google",
  "position": "Software Engineer"
}
```

---

#### Get All Jobs

```http
GET /api/v1/jobs
```

Returns all jobs belonging to the authenticated user.

---

#### Get Single Job

```http
GET /api/v1/jobs/:id
```

Returns a single job if it belongs to the authenticated user.

---

#### Update Job

```http
PATCH /api/v1/jobs/:id
```

Request Body:

```json
{
  "company": "Microsoft",
  "position": "Backend Developer"
}
```

---

#### Delete Job

```http
DELETE /api/v1/jobs/:id
```

Deletes the specified job if it belongs to the authenticated user.

---

## Authentication Flow

### Register

1. User submits registration details.
2. Password is hashed using bcrypt.
3. User is saved to MongoDB.
4. JWT token is generated.
5. Token is returned to the client.

### Login

1. User submits email and password.
2. Credentials are verified.
3. Password is compared against the stored hash.
4. JWT token is generated.
5. Token is returned to the client.

### Protected Routes

1. Client sends JWT in the Authorization header.
2. Authentication middleware verifies the token.
3. User information is attached to the request object.
4. Access is granted to protected resources.

---

## Security

### Helmet

Sets secure HTTP response headers.

### Rate Limiting

Limits excessive requests from the same IP address.

Current configuration:

* Window: 15 minutes
* Max Requests: 100

### Password Hashing

Passwords are hashed before storage using bcrypt.

### JWT Authentication

Protected routes require a valid signed JWT.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd jobs-api
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

## Project Structure

```text
jobs-api
│
├── controllers
│   ├── auth.controller.js
│   └── jobs.controller.js
│
├── db
│   └── connectDB.js
│
├── errors
│
├── middleware
│   ├── authentication.middleware.js
│   ├── error-handler.middleware.js
│   └── not-found.middleware.js
│
├── models
│   ├── User.model.js
│   └── Job.model.js
│
├── routes
│   ├── auth.router.js
│   └── jobs.router.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## Future Improvements

* Refresh Token Authentication
* Logout Endpoint
* Role-Based Authorization
* Job Search & Filtering
* Pagination
* API Documentation with Swagger/OpenAPI
* Docker Support
* Automated Testing

---

## Author

**Soumadip Banerjee**

Junior Software Engineer | MERN Stack Developer | Backend Development Enthusiast
