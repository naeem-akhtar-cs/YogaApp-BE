# Online Exercises Platform

This project is an online exercises platform that provides users with various features, including user management, exercise protocols, payment handling, and subscription management. The backend is built using Node.js with Express, and it incorporates several security and optimization features.

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- **app.js**: The main application file that sets up the server, connects to the database, and configures routes and middlewares.
- **routes/**: Contains route files that handle various API endpoints (user, protocol, payment, subscription).
- **config/**: Contains configuration files, including the database connection.
- **.env**: The environment file that holds the necessary environment variables.
- **Dockerfile**: Used to create a Docker image for the application.

## Environment Setup

Before running the application, ensure you have the following environment variables set up in a `.env` file:

- `FE_URL`: The URL of your frontend application.
- `BE_PORT`: The port number on which the backend server will run.
- `DB_URI`: The MongoDB connection string.
- `SSL_KEY_PATH`: Path to the SSL private key file (optional).
- `SSL_CERT_PATH`: Path to the SSL certificate file (optional).
- `SSL_CA_PATH`: Path to the SSL CA bundle file (optional).

## Running the Application

### 1. Clone the Repository

```bash
git clone https://github.com/naeem-akhtar-cs/YogaApp-BE.git
cd YogaApp-BE
```

## 2. Install Dependencies

Ensure that Node.js is installed on your machine, then run:

```bash
npm install
```

## 3. Set Up the Environment
Create a `.env` file in the root directory and set the necessary environment variables as mentioned in the Environment Setup section.

## 4. Start the Application
You can start the application using:
```
node app.js
```
Alternatively, you can use Docker to run the application:
```
docker build -t YogaApp-BE .
docker run -d -p 3000:3000 --env-file .env online-exercises-app
```

## 5. Access the Application
After starting the application, it will be accessible at https://localhost:<BE_PORT>.

## API Endpoints

- **/api/user**: Handles user-related operations such as registration, login, and profile management.
- **/api/protocol**: Manages exercise protocols and related functionalities.
- **/api/payment**: Handles payment processing for subscriptions and other transactions.
- **/api/subscription**: Manages subscription plans, including creation, updates, and cancellations.
- **/api/health**: Health check endpoint to verify that the application is running.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database used for storing application data.
- **Helmet**: Helps secure Express apps by setting various HTTP headers.
- **Cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **HTTPS**: Secure communication setup using SSL/TLS certificates.
- **Docker**: Containerization platform that simplifies application deployment.


### Command to run
```sudo docker-compose stop && sudo docker-compose build && sudo docker-compose up -d && sudo docker-compose logs -f```
