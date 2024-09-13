# Bloglist CI/CD - FullStackOpen

## Overview

This repository is for exercises 11.19-11.21. It consolidates the blog application developed in parts 4 and 5 into a single repository, and includes CI/CD implementations using GitHub Actions.

The application consists of:
- **Frontend**: Built with React and Vite.
- **Backend**: A REST API built with Express and MongoDB.

- **Testing**: Includes unit tests, integration tests, and end-to-end tests.
- **Linting**: ESLint configuration for code quality.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

git clone https://github.com/your-username/bloglist-cicd.git
cd bloglist-cicd
npm install

### Environment Variables (remote)

You need to configure the following github secret variables:

- **MONGODB_URI**: The connection string for your MongoDB instance.
- **FLY_API_TOKEN**: Your API token for Fly.io.

#### Local Setup

1. Create a `.env` file in the root directory of the project.
2. Add the required environment variables:

   ```dotenv
   FLY_API_TOKEN= Your API token for Fly.io.
   PORT= The port number for the server to listen on.
   MONGODB_URI= The connection string for your MongoDB database.
   TEST_MONGODB_URI= The connection string for your test MongoDB database.
   SECRET= A secret key for authorization purposes.
