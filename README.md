# MERN Bug Tracker

A full-stack bug tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows teams to track, manage, and resolve bugs efficiently.

## Features

- User authentication (login/register)
- Create, read, update, and delete bugs
- Assign bugs to team members
- Track bug status and priority
- User roles (admin/user)
- Real-time updates
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Morphiu/mern-bug-tracker.git
cd mern-bug-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Backend (.env):
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Frontend (.env):
```env
VITE_BASE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Testing

### Backend Testing

1. Run unit tests:
```bash
cd backend
npm test
```

2. Run tests with coverage:
```bash
npm run test:coverage
```

### Frontend Testing

1. Run unit tests:
```bash
cd frontend
npm test
```

2. Run tests with coverage:
```bash
npm run test:coverage
```

## Testing Approach

### Backend Testing
- Unit tests for controllers and models
- Integration tests for API endpoints
- Authentication middleware testing
- Database operations testing
- Error handling testing

### Frontend Testing
- Component testing with React Testing Library
- Context testing (AuthContext)
- API integration testing
- User interaction testing
- Form validation testing

## Debugging Techniques

### Backend Debugging
1. Console Logging:
   - Authentication flow logging
   - Database operation logging
   - Error logging
   - Request/Response logging

2. Using Node.js Debugger:
```bash
# Start backend with debugger
cd backend
npm run debug
```

3. MongoDB Compass for database debugging

### Frontend Debugging
1. React DevTools for component inspection
2. Browser DevTools:
   - Network tab for API requests
   - Console for error logging
   - Application tab for localStorage inspection
3. Redux DevTools (if using Redux)

## Error Handling

### Common Issues and Solutions

1. Authentication Issues:
   - Check JWT_SECRET in backend .env
   - Verify token storage in localStorage
   - Check API URL configuration

2. Database Connection:
   - Verify MongoDB URI
   - Check MongoDB service status
   - Verify network connectivity

3. API Issues:
   - Check CORS configuration
   - Verify API endpoints
   - Check request/response format

## Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── tests/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    ├── tests/
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 