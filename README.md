# Cardcade
*New way to memorise, faster.*

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
git clone https://github.com/popiolekdawid/cardcade
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


## Screenshots

Your flashcards:
<img width="1275" alt="Screenshot 2023-06-21 at 14 34 41" src="https://github.com/popiolekdawid/cardcade/assets/112573508/52cd310a-3799-468a-8337-fd958b40853d">

Add new flashcard:
<img width="1275" alt="Screenshot 2023-06-21 at 14 34 59" src="https://github.com/popiolekdawid/cardcade/assets/112573508/2b343e8f-6da8-492a-9ed8-b8b4c6772156">

Sign up screen:
<img width="1275" alt="Screenshot 2023-06-21 at 14 27 44" src="https://github.com/popiolekdawid/cardcade/assets/112573508/1a629bb6-d124-44bb-9f07-b0f8e3c2404d">

Sign in screen:
<img width="1275" alt="Screenshot 2023-06-21 at 14 28 27" src="https://github.com/popiolekdawid/cardcade/assets/112573508/0cfd9f74-9480-4cc5-b1f6-035a5cd18f47">


