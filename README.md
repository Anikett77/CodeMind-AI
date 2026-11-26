# CodeMind AI

**An AI-powered GitHub Codebase Assistant built with LangChain and RAG.**

CodeMind AI allows developers to connect a GitHub repository, index its source code, and ask questions about the codebase using natural language.

## Features

- GitHub repository ingestion
- Automatic code document processing and chunking
- Semantic search using Hugging Face embeddings
- Vector storage with ChromaDB
- Retrieval-Augmented Generation (RAG)
- AI-powered codebase question answering
- File and line references in responses

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Python, FastAPI
- **LLM:** Groq
- **AI Framework:** LangChain
- **Embeddings:** Sentence Transformers
- **Vector Database:** ChromaDB
- **Source:** GitHub REST API

## Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
GITHUB_TOKEN=your_github_token
```

Start the server:

```bash
uvicorn app.main:app --reload
```

Backend API: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Project Status

Currently under development. Deployment and additional features are in progress.
