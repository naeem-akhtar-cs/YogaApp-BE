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
### Command to run
```sudo docker-compose stop && sudo docker-compose build && sudo docker-compose up -d && sudo docker-compose logs -f```
