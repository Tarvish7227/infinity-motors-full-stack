# Infinity Motors Backend

Backend API for the Infinity Motors car rental application.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- User registration and login
- Protected routes
- Password change functionality
- User profile management

## Installation

1. Clone the repository
2. Navigate to the backend folder:

   ```
   cd backend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a `.env` file based on `.env.example`:

   ```
   cp .env.example .env
   ```

5. Update your MongoDB URI and JWT secret in the `.env` file

## Running the Server

### Development Mode (with auto-reload)

```
npm run dev
```

### Production Mode

```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication

#### Register

- **POST** `/api/auth/register`
- Body: `{ name, email, password, phone }`

#### Login

- **POST** `/api/auth/login`
- Body: `{ email, password }`

#### Get Current User

- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

#### Update Profile

- **PUT** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, phone }`

#### Change Password

- **PUT** `/api/auth/change-password`
- Headers: `Authorization: Bearer <token>`
- Body: `{ currentPassword, newPassword, confirmPassword }`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time (default: 7d)
- `NODE_ENV` - Environment (development/production)

## Technology Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Development auto-reload
