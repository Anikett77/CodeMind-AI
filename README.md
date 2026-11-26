# CodeMind AI — Frontend

**Chat with your codebase. Understand your repository. Build smarter.**

CodeMind AI is an AI-powered GitHub repository assistant that helps developers understand, explore, and analyze codebases using natural language. Connect a GitHub repository, let the system index its source code, and ask questions about its architecture, implementation, and functionality.

This repository contains the frontend application built with Next.js and Tailwind CSS.

## Features

- **GitHub Repository Integration** — Enter a GitHub repository URL to get started.
- **AI-Powered Codebase Chat** — Ask natural-language questions about your repository.
- **Code Understanding** — Explore authentication flows, database connections, API routes, and application logic.
- **Context-Aware Responses** — Get answers based on retrieved source-code context.
- **Source References** — View relevant file paths and line references in AI responses.
- **Responsive Interface** — Clean, modern interface designed for desktop and mobile screens.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and frontend application |
| React | UI development |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive design |
| FastAPI | Backend API integration |
| REST API | Frontend-backend communication |

## Project Structure

```text
frontend/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── public/
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd <YOUR_FRONTEND_REPOSITORY_NAME>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

For production, replace the local backend URL with your deployed backend URL.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

The frontend communicates with the CodeMind AI FastAPI backend through REST API endpoints.

Backend repository: [Add Backend GitHub URL]

Backend API: [https://codemind-ai-backend-6qhg.onrender.com](https://codemind-ai-backend-6qhg.onrender.com)

API documentation: [https://codemind-ai-backend-6qhg.onrender.com/docs](https://codemind-ai-backend-6qhg.onrender.com/docs)

## Deployment

The frontend is designed to be deployed on **Vercel**.

1. Import the frontend GitHub repository into Vercel.
2. Configure the environment variable:

   `NEXT_PUBLIC_API_BASE_URL`

3. Set its value to your deployed backend URL.
4. Deploy the application.

## Future Improvements

- User authentication and personalized workspaces
- Repository indexing history
- Persistent chat sessions
- Improved code retrieval and response accuracy
- Advanced code analysis and debugging assistance

## License

This project is currently under development.