# Payment Check System

A full-stack application for tracking and managing payment transactions with real-time analytics and webhook support.

## 🏗️ Architectur

This project consists of:
- **Backend**: FastAPI-based REST API with async task processing
- **Frontend**: Next.js with TypeScript and modern React components
- **Database**: Supabase for data persistence
- **Task Queue**: Redis-based job processing

## 📁 Project Structure

```
payment-check/
├── backend/          # FastAPI backend application
├── frontend/         # Next.js frontend application
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Docker & Docker Compose (for local development)
- Supabase account for database

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Configure your environment variables
docker-compose up -d   # Start Redis and dependencies
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local  # Configure your Supabase credentials
npm run dev
```

## 📋 Features

- Transaction tracking and analytics
- Real-time payment status updates
- Webhook support for payment providers
- Interactive charts and visualizations
- Responsive design with modern UI

## 🛠️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- Celery
- Redis
- Pydantic

### Frontend
- Next.js 15
- TypeScript
- React
- CSS Modules
- Recharts

## 📝 License

MIT

## 👤 Author

Puvvada Ritesh
