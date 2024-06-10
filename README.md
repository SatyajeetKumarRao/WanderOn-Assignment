

# Secure User Authentication System

## Introduction



A secure user authentication system employs MongoDB for data storage, bcrypt for password hashing, and JWTs for session management. During registration, passwords are hashed with bcrypt to enhance security. Server-side validation and input sanitization protect against vulnerabilities like XSS and SQL injection. During login, credentials are verified against hashed passwords. Upon successful authentication, a JWT is issued to the client for validating subsequent requests. This stateless token system ensures secure and efficient access to protected resources.



## Project Type



Frontend | Backend | FullStack



## Deplolyed App



Frontend: https://user-authentication-system-wanderon.vercel.app/



Backend: https://user-authentication-system-wanderon.onrender.com



## Directory Structure

```

├── README.md

└── User Authentication System/

│   ├── .gitignore

│   ├── backend/

│   │   ├── controller/

│   │   │   └── users.controller.js

│   │   ├── middleware/

│   │   │   ├── auth.middleware.js

│   │   │   └── users.middleware.js

│   │   ├── models/

│   │   │   ├── blacklistToken.model.js

│   │   │   └── users.model.js

│   │   ├── package-lock.json

│   │   ├── package.json

│   │   ├── routes/

│   │   │   ├── trips.routes.js

│   │   │   └── users.routes.js

│   │   ├── server.js

│   │   └── utils/

│   │   │   └── db.config.js

│   └── frontend/

│   │   ├── .eslintrc.cjs

│   │   ├── .gitignore

│   │   ├── README.md

│   │   ├── index.html

│   │   ├── package-lock.json

│   │   ├── package.json

│   │   ├── public/

│   │   │   └── vite.svg

│   │   ├── src/

│   │   │   ├── App.css

│   │   │   ├── App.jsx

│   │   │   ├── Routes/

│   │   │   │   ├── AllRoutes.jsx

│   │   │   │   └── PrivateRoute.jsx

│   │   │   ├── assets/

│   │   │   │   ├── favicon.ico

│   │   │   │   ├── logo.webp

│   │   │   │   └── react.svg

│   │   │   ├── components/

│   │   │   │   └── Navbar.jsx

│   │   │   ├── contexts/

│   │   │   │   └── authContext.jsx

│   │   │   ├── index.css

│   │   │   ├── main.jsx

│   │   │   ├── pages/

│   │   │   │   ├── ExploreIndia.jsx

│   │   │   │   ├── GroupTours.jsx

│   │   │   │   ├── Home.jsx

│   │   │   │   ├── InternationalPackage.jsx

│   │   │   │   ├── Login.jsx

│   │   │   │   ├── Signup.jsx

│   │   │   │   └── WeekendsTrips.jsx

│   │   │   └── utils/

│   │   │   │   └── vars.js

│   │   └── vite.config.js

```







## Features

- **Secure User Registration**: Passwords hashed with bcrypt for enhanced security.

- **Login Authentication**: Validates credentials against hashed passwords.

- **JWT Session Management**: Issues JWTs for stateless, efficient session handling.

- **Server-side Data Validation**: Ensures inputs are safe and meet criteria.

- **MongoDB Data Storage**: Uses a scalable NoSQL database for efficient data management.

- **Stateless Authentication**: JWTs ensure authorized access without server-side session storage.

- **Robust Security**: Combines bcrypt, JWTs, validation, and sanitization for strong protection.

- **Responsive Design**: Delivers a consistent, appealing experience on all devices..



  

## Installation & Getting started



Detailed instructions on how to install, configure, and get the project running.



```bash

git clone https://github.com/SatyajeetKumarRao/WanderOn-Assignment.git





### To get inside FrontEnd directory

cd frontend

npm install



### To get inside Backend directory

cd backend

npm install



```



## Usage



To start FrontEnd



```bash

npm run dev



```



To start Backend



```bash

npm run server



```



## Snapshot of Website





## API Endpoints



Backend Applications provide a list of your API endpoints, methods, brief descriptions.



<p>POST /users/signup - create a new user with validation and registration logic</p>

<p>POST /users/login - authenticate a user with validation and authentication logic</p>

<p>POST /users/logout - log out a user</p>





## Technology Stack



### List and provide a brief overview of the technologies used in the project.



- React.js

- Chakra-ui

- ExpressJS

- NodeJS

- MongoDB






