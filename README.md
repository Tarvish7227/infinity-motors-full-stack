# Infinity Motors - Full Stack

A full-stack web application for managing and showcasing motor vehicles. Built with React, Vite, Node.js, and Express.

## Features

- 🚗 **Featured Cars Showcase** - Display and browse available vehicles
- 🔐 **Authentication System** - Secure user login and registration
- 📞 **Contact Management** - Get in touch with customer support
- 💬 **Testimonials** - Customer reviews and feedback
- 📊 **Statistics** - Display key metrics and information
- 🎨 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed

## Tech Stack

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (implied from User model)
- **JWT** - Authentication

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── backend/              # Backend source code
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server
│   └── package.json     # Backend dependencies
├── public/              # Static assets
└── package.json         # Frontend dependencies
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tarvish7227/infinity-motors-full-stack.git
   cd infinity-motors-full-stack
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Setup environment variables**
   - Create `.env` file in the `backend` folder
   - Add your configuration (see `SETUP.md` for details)

## Getting Started

### Run Frontend (Development)

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Run Backend (Development)

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000` (or your configured port)

## Authentication

See [AUTHENTICATION.md](./backend/AUTHENTICATION.md) for detailed authentication setup and configuration.

## Setup Guide

For detailed setup instructions, refer to:

- [Frontend Setup](./README.md)
- [Backend Setup](./backend/SETUP.md)
- [Authentication Guide](./backend/AUTHENTICATION.md)

## API Endpoints

See backend documentation for available API endpoints and their usage.

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository.
