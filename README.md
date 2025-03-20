REST-API
============

A robust REST API built with Node.js (TypeScript) and Express.js, implementing authentication, real-time communication, and session-based authorization.

Setup Instructions
==================

1. Clone the Repository
-----------------------
```
git clone https://github.com/Surajjoshi461/Rest-Api
```

2. Install Dependencies
-----------------------
```
npm install
```

3. Configure Environment Variables
----------------------------------
Create a `.env.local` file in the root directory and add your **database credentials**:
```
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
JWT_SECRET=your_secret_key
```

4. Generate Database Migration
------------------------------

5. Build the Project
--------------------
Before running the project, ensure the TypeScript build is correct:
```
npm run build
# If the above command doesn't work, use:
tsc
```

6. Start the Application
------------------------
```
npm run start
```

Features Implemented
=====================
✔ Authentication & Authorization using **JWT (HTTP-only cookies)**  
✔ Session handling (Single login per user, invalidates old session)  
✔ Secure input validation and error handling  
✔ PostgreSQL integration using **Prisma ORM**  
✔ WebSockets (Socket.io) for real-time updates  
✔ Middleware for session validation  

