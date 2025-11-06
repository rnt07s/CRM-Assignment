# CRM System for Counselor and Student Management

A Customer Relationship Management (CRM) system designed to manage interactions between counselors and students. This system helps track student enquiries, counselor assignments, and manage the overall admission process.

# Features

- **Authentication System**
  - User registration for counselors
  - Secure login with JWT authentication
  - Role-based access control (Counselor/Student)

- **Enquiry Management**
  - Public enquiry submission
  - View all enquiries (for counselors)
  - Track enquiry status
  - Assign enquiries to counselors

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Enquiries
```
POST /api/enquiries/public     - Submit a public enquiry
GET /api/enquiries/my          - Get counselor's assigned enquiries
GET /api/enquiries/unclaimed   - Get all unclaimed enquiries
POST /api/enquiries/claim/:id  - Claim an enquiry
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CRM-Conselor-and-Student.git
```

2. Install dependencies
```bash
cd server
npm install
```

3. Configure environment variables
Create a `.env` file in the server directory with:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
npm start
```

## API Usage

### Register a New Counselor
```http
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
    "name": "Counselor Name",
    "email": "counselor@example.com",
    "password": "password123",
    "role": "Counselor"
}
```

### Login
```http
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
    "email": "counselor@example.com",
    "password": "password123"
}
```

### Submit an Enquiry
```http
POST http://localhost:5001/api/enquiries/public
Content-Type: application/json

{
    "name": "Student Name",
    "email": "student@example.com",
    "phone": "1234567890",
    "courseInterest": "Course Name",
    "message": "Enquiry message"
}
```

### View Enquiries
```http
GET http://localhost:5001/api/enquiries/my
Authorization: Bearer your_token_here
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing

## Project Structure

```
server/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── enquiryController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Employee.js
│   └── Enquiry.js
├── routes/
│   ├── authRoutes.js
│   └── enquiryRoutes.js
├── utils/
│   └── generateToken.js
├── app.js
└── server.js
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- Input validation
- Error handling

## Environment Variables

- `PORT`: Server port (default: 5001)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
