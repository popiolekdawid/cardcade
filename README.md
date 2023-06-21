# cardcade
New way to memorise, faster.

This is a web application that allows users to manage their flashcards. Users can create, view, edit, and delete flashcards. The application provides features such as user authentication, profile management, and flashcard management.

## Features

- User registration and login
- User profile management
- Flashcard CRUD operations (Create, Read, Update, Delete)
- Flashcard validation
- Access control with token-based authentication

## Technologies Used

- Front-end:
  - React.js: JavaScript library for building user interfaces
  - HTML, CSS: Markup and styling
  - Axios: HTTP client for making API requests

- Back-end:
  - Node.js: JavaScript runtime for server-side development
  - Express.js: Web application framework
  - MongoDB: NoSQL database for storing user and flashcard data
  - Mongoose: MongoDB object modeling for Node.js
  - JSON Web Tokens (JWT): Token-based authentication

## Getting Started

### Prerequisites

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

### Installation

1. Clone the repository:
```
bash
git clone <repository-url>
 ```
2. Install the dependencies:

```
cd flashcard-app
npm install
```

3. Set up environment variables:

Create a .env file in the root directory.
Add the following environment variables:
```
MONGODB_URI: MongoDB connection URI
JWT_SECRET: Secret key for JWT authentication
```

Start the application:
```
npm start
```

Open your web browser and visit http://localhost:3000 to start learning.
