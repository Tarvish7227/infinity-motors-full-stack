const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Verify required environment variables
if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is not set in .env file");
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is not set in .env file");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));

// Basic route
app.get("/api", (req, res) => {
  res.json({ message: "Infinity Motors API" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
