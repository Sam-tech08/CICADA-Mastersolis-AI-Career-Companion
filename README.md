# -AI-Career-Companion

AI-Career-Companion is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) designed to assist users in managing their career paths with AI-driven insights and resources.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Mastersolis-AI-Career-Companion.git
   ```

2. Navigate to the project directory:
   ```
   cd Mastersolis-AI-Career-Companion
   ```

3. Set up the server:
   - Navigate to the server directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on the `.env.example` file and configure your environment variables.

4. Set up the client:
   - Navigate to the client directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on the `.env.example` file and configure your environment variables.

5. Start the application:
   - For the server:
     ```
     cd ../server
     npm start
     ```
   - For the client:
     ```
     cd ../client
     npm start
     ```

## Usage

Once the application is running, you can access the client-side application in your web browser at `http://localhost:3000`. The server-side API will be available at `http://localhost:5000`.

## Project Structure

```
Mastersolis-AI-Career-Companion
├── .gitignore
├── .env.example
├── README.md
├── package.json
├── docker-compose.yml
├── .github
│   └── workflows
│       └── ci.yml
├── client
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── public
│   │   └── index.html
│   └── src
│       ├── index.tsx
│       ├── App.tsx
│       ├── routes
│       │   └── index.tsx
│       ├── components
│       │   ├── common
│       │   │   └── index.tsx
│       │   └── layout
│       │       └── Header.tsx
│       ├── pages
│       │   ├── Home.tsx
│       │   └── Dashboard.tsx
│       ├── hooks
│       │   └── useAuth.ts
│       ├── context
│       │   └── AuthContext.tsx
│       ├── services
│       │   └── api.ts
│       ├── types
│       │   └── index.ts
│       ├── styles
│       │   └── globals.css
│       └── tests
│           └── App.test.tsx
├── server
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src
│       ├── index.ts
│       ├── app.ts
│       ├── config
│       │   └── db.ts
│       ├── controllers
│       │   └── auth.controller.ts
│       ├── routes
│       │   └── auth.routes.ts
│       ├── models
│       │   └── user.model.ts
│       ├── middlewares
│       │   └── auth.middleware.ts
│       ├── services
│       │   └── auth.service.ts
│       ├── utils
│       │   └── logger.ts
│       └── tests
│           └── auth.test.ts
├── scripts
│   └── setup.sh
└── docs
    ├── architecture.md
    └── api.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
