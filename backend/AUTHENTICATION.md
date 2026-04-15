# Authentication & Login Validation Guide

Complete documentation for the Infinity Motors Backend authentication system with login validation, rate limiting, and security features.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Login Validation Features](#login-validation-features)
3. [API Endpoints](#api-endpoints)
4. [Security Features](#security-features)
5. [Error Handling](#error-handling)
6. [Frontend Integration](#frontend-integration)

---

## 🚀 Quick Start

### Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

### Basic Login Flow

```javascript
// 1. User logs in
POST http://localhost:5000/api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// 2. Receive token
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}

// 3. Use token for protected routes
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 🔐 Login Validation Features

### Input Validation

```
Email:
  ✓ Required
  ✓ Valid email format
  ✓ Case-insensitive (lowercase stored)
  ✓ Trimmed (whitespace removed)

Password:
  ✓ Required
  ✓ Minimum 6 characters for login
  ✓ Compared securely with bcrypt
```

### Brute Force Protection

- **Rate Limiting:** 5 login attempts per 15 minutes per IP
- **Account Lockout:** After 5 failed attempts, account locked for 15 minutes
- **Attempt Tracking:** Failed attempts tracked per email
- **Auto Reset:** Resets on successful login or timeout

### Error Messages

```json
{
  "success": false,
  "message": "Invalid email or password",
  "attemptsRemaining": 3
}
```

### Account Lockout

```json
{
  "success": false,
  "message": "Account temporarily locked due to too many login attempts. Please try again later."
}
```

---

## 📡 API Endpoints

### 1️⃣ Register User

**POST** `/api/auth/register`

**Validation:**

- Name: 2-50 characters
- Email: Valid format, must be unique
- Password: Min 6 chars, must be **strong**
  - ✓ Uppercase (A-Z)
  - ✓ Lowercase (a-z)
  - ✓ Number (0-9)
  - ✓ Min 8 characters

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Errors:**

- `400` - Validation failed (check `errors` object)
- `409` - Email already registered

---

### 2️⃣ Login User ⭐ MAIN ENDPOINT

**POST** `/api/auth/login`

**Rate Limited:** YES (5 attempts / 15 mins)

**Validation:**

- Email: Required, valid format
- Password: Required, min 6 characters

**Request:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200) - Success:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Response (401) - Invalid Credentials:**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "attemptsRemaining": 2
}
```

**Response (429) - Account Locked:**

```json
{
  "success": false,
  "message": "Account temporarily locked due to too many login attempts. Please try again later."
}
```

**Response (400) - Validation Error:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please provide a valid email",
    "password": "Password must be at least 6 characters"
  }
}
```

---

### 3️⃣ Get Current User

**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

---

### 4️⃣ Update Profile

**PUT** `/api/auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Validation:**

- Name: Optional, 2-50 characters
- Phone: Optional, valid format

**Request:**

```json
{
  "name": "Jane Doe",
  "phone": "+1987654321"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### 5️⃣ Change Password

**PUT** `/api/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Validation:**

- All fields required
- New password must differ from current
- Must be **strong** (upper, lower, number, 8+ chars)

**Request:**

```json
{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!",
  "confirmPassword": "NewSecurePass456!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error (400) - Weak Password:**

```json
{
  "success": false,
  "message": "New password is not strong enough...",
  "requirements": {
    "isStrong": false,
    "hasUpperCase": true,
    "hasLowerCase": true,
    "hasNumbers": false,
    "hasNonalphaNumericChars": false,
    "isLengthValid": true
  }
}
```

---

## 🛡️ Security Features

### 1. Password Strength Validation

```javascript
// Required:
+ Uppercase letter (A-Z)
+ Lowercase letter (a-z)
+ Number (0-9)
+ Min 8 characters OR special character

// Examples:
✓ MyPassword123    // Valid
✓ Pass@12345       // Valid
✓ PASSWORD123      // Invalid (no lowercase)
✓ password123      // Invalid (no uppercase)
```

### 2. Password Hashing

- Algorithm: bcryptjs
- Salt rounds: 10
- Never stored in plain text
- Secure comparison on login

### 3. JWT Tokens

- Expiration: 7 days (configurable)
- Algorithm: HS256
- Verified on protected routes
- Invalid/expired tokens rejected

### 4. Rate Limiting

```
Login endpoint:     5 attempts / 15 minutes
General API:       100 requests / 15 minutes
Per IP address:    Tracked by IP
```

### 5. Login Attempt Tracking

```
Attempts: 1/5  ← Free to try
Attempts: 2/5  ← Free to try
Attempts: 3/5  ← Free to try
Attempts: 4/5  ← 1 attempt remaining (shown to user)
Attempts: 5/5  ← LOCKED for 15 minutes
                   Attempt counter resets after 15 min
```

### 6. Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## 📤 Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": "Field specific error"
  }
}
```

### HTTP Status Codes

| Code | Meaning           | Example              |
| ---- | ----------------- | -------------------- |
| 200  | Success           | Login successful     |
| 201  | Created           | User registered      |
| 400  | Bad Request       | Validation failed    |
| 401  | Unauthorized      | Invalid credentials  |
| 404  | Not Found         | User not found       |
| 409  | Conflict          | Email already exists |
| 429  | Too Many Requests | Account locked       |
| 500  | Server Error      | Database error       |

---

## 💻 Frontend Integration

### React Example

```javascript
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || `Error: ${response.status}`);
        return;
      }

      // Save token
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}
```

### Using Authenticated Endpoints

```javascript
async function fetchUserProfile() {
  const token = localStorage.getItem("authToken");

  const response = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    // Token expired, redirect to login
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  return response.json();
}
```

---

## 🔑 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/infinity-motors

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

---

## ✅ Validation Checklist

- [x] Email format validation
- [x] Password minimum length (6 for login, 8 for registration)
- [x] Password strength requirements
- [x] Rate limiting on login
- [x] Account lockout after failed attempts
- [x] Input trimming and case normalization
- [x] Secure password comparison
- [x] JWT token verification
- [x] Security headers
- [x] CORS protection
- [x] Error message sanitization

---

## 🚨 Common Issues

**Q: "Account temporarily locked"**
A: Too many failed login attempts. Wait 15 minutes or use correct credentials.

**Q: "Invalid email or password"**
A: Check email spelling and password. Remember passwords are case-sensitive.

**Q: "Token not found"**
A: Make sure Authorization header is in format: `Bearer <token>`

**Q: "Password is not strong enough"**
A: Password must have uppercase, lowercase, number, and be 8+ characters.
