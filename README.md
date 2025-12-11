Backend Boilerplate

This is a Node.js + Express backend boilerplate with JWT authentication, user management, and production-ready security and logging features.

Features

Modular structure: /modules/auth, /modules/user with controller, services, models

JWT authentication (access & refresh tokens)

Password hashing with bcrypt

Input validation using validator

Error handling middleware

Rate limiting (global + auth-specific)

Helmet with Content Security Policy (CSP) and other security headers

CORS configuration

Body-size limit to prevent DoS attacks

Pino logger with separate dev/production setup

Environment configuration via .env

Installation

Clone the repository:

git clone <repo_url>
cd backendBoilerplate

Install dependencies:

npm install

Set up .env file (copy from .env.example) and configure environment variables:

PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=appdb
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
NODE_ENV=development

Running the Server

Development

npm run dev

Uses cors({ origin: true }) and console logging.

Production

NODE_ENV=production node main.js

Uses secure Helmet configuration, strict CORS, global and auth-specific rate limits, and logs to files.

Project Structure

/src
  /config
    index.js
    helmetConfig.js
    rateLimitConfig.js
  /db
    mongo.js
  /middlewares
    authUser.js
    error.js
    validateSignup.js
    validateLogin.js
    validateRefreshToken.js
  /modules
    /auth
      /controller
      /services
      /models
      index.js
    /user
      ...
  /router
  /utils
    catchAsync.js
    logger.js
main.js
.env

Usage

Auth Routes:

POST /auth/signup - create new user

POST /auth/login - login user

POST /auth/refresh - refresh JWT

User Routes:

GET /users - fetch users (example)

Security

HTTPS is recommended; run behind Nginx or another reverse proxy

Helmet with CSP enabled

Strict CORS for production

Rate limiting to prevent brute force attacks

Environment secrets should be strong and rotated regularly

Logging

Dev: logs to console with pino-pretty

Production: logs to /logs/info.log and /logs/error.log

Notes

Apply auth-specific rate limits inside /modules/auth/index.js

Body limit is set to 10kb to prevent large payload DoS attacks

Customize CSP directives in helmetConfig.js as needed

