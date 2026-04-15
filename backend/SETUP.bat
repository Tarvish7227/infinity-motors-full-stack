@echo off
REM Quick Setup Guide for Infinity Motors Backend

echo.
echo ===== INFINITY MOTORS BACKEND - SETUP INSTRUCTIONS =====
echo.

echo ✓ Backend Created Successfully!
echo.
echo ---- BACKEND STRUCTURE ----
echo backend/
echo   ├── server.js
echo   ├── package.json
echo   ├── .env.example
echo   ├── AUTHENTICATION.md        (Complete auth documentation)
echo   ├── README.md
echo   ├── controllers/authController.js
echo   ├── routes/auth.js
echo   ├── middleware/
echo   │   ├── auth.js
echo   │   ├── validators.js
echo   │   └── rateLimiter.js
echo   ├── models/User.js
echo   └── utils/validation.js
echo.

echo ---- SETUP STEPS ----
echo 1. Open PowerShell/Command Prompt
echo    cd backend
echo.
echo 2. Install dependencies:
echo    npm install
echo.
echo 3. Create .env file from template:
echo    copy .env.example .env
echo.
echo 4. Edit .env and add:
echo    - MONGODB_URI=mongodb://localhost:27017/infinity-motors
echo    - JWT_SECRET=your_secret_key_here
echo    - PORT=5000
echo.
echo 5. Make sure MongoDB is running
echo.
echo 6. Start the server:
echo    npm run dev        (Development with auto-reload)
echo    npm start          (Production)
echo.

echo ---- NEW FEATURES ADDED ----
echo ✓ Login validation (express-validator)
echo ✓ Rate limiting (5 attempts / 15 minutes)
echo ✓ Account lockout after failed attempts
echo ✓ Password strength validation
echo ✓ Bcrypt hashing with salt rounds: 10
echo ✓ JWT authentication
echo ✓ Security headers
echo ✓ Error handling
echo.

echo ---- API ENDPOINTS ----
echo PUBLIC:
echo   POST   /api/auth/register
echo   POST   /api/auth/login              (rate limited)
echo.
echo PROTECTED (require JWT token):
echo   GET    /api/auth/me
echo   PUT    /api/auth/profile
echo   PUT    /api/auth/change-password
echo.

echo ---- PASSWORD REQUIREMENTS ----
echo Registration Password MUST BE STRONG:
echo   - Uppercase letters (A-Z)
echo   - Lowercase letters (a-z)
echo   - Numbers (0-9)
echo   - Minimum 8 characters
echo.
echo Example: MyPassword123 or SecurePass456!
echo.

echo ---- QUICK TEST ----
echo Using Postman or curl:
echo.
echo 1. Register:
echo    POST http://localhost:5000/api/auth/register
echo    Body (JSON):
echo    {
echo      "name": "John Doe",
echo      "email": "john@test.com",
echo      "password": "SecurePass123!"
echo    }
echo.
echo 2. Login:
echo    POST http://localhost:5000/api/auth/login
echo    Body (JSON):
echo    {
echo      "email": "john@test.com",
echo      "password": "SecurePass123!"
echo    }
echo.
echo 3. Get user (with token):
echo    GET http://localhost:5000/api/auth/me
echo    Header: Authorization: Bearer {your_token}
echo.

echo ---- SECURITY FEATURES ----
echo ✓ Brute force protection (account lockout)
echo ✓ Strong password enforcement
echo ✓ Bcryptjs password hashing
echo ✓ JWT token validation
echo ✓ CORS enabled
echo ✓ Security headers
echo ✓ Input validation
echo.

echo ---- DOCUMENTATION ----
echo Read these files for complete information:
echo   - backend\AUTHENTICATION.md
echo   - backend\README.md
echo.

echo ---- TROUBLESHOOTING ----
echo Q: Account locked message?
echo A: Too many failed logins. Wait 15 minutes.
echo.
echo Q: Password not strong enough?
echo A: Must have uppercase, lowercase, number, 8+ chars
echo.
echo Q: MongoDB connection error?
echo A: Make sure MongoDB is running locally or update MONGODB_URI
echo.

echo.
echo Ready! Run: cd backend ^&^& npm run dev
echo.
pause
