# 💰 Paycheck Dashboard Backend

A production-grade, metrics-driven backend built with **FastAPI**, **Supabase (PostgreSQL)**, and **Redis RQ** to process transaction webhooks asynchronously with guaranteed idempotency, persistence, and background job handling.

---

## 🚀 Overview

This backend receives **transaction webhooks**, queues them for asynchronous processing (simulated 30s delay), and stores results in a Supabase PostgreSQL database.  
It ensures each transaction is processed **exactly once** — even if the webhook is triggered multiple times.

---

## 🧩 Architecture

**Core Components:**

| Layer | Technology | Purpose |
|-------|-------------|----------|
| API | FastAPI | Handles webhooks, health checks, transaction retrieval |
| Queue | Redis (Upstash) | Message broker for background jobs |
| Worker | RQ (Redis Queue) | Processes jobs asynchronously |
| Database | Supabase PostgreSQL | Persistent data storage |
| Deployment | Render + Docker | Cloud deployment and orchestration |

**Data Flow:**
1. A webhook triggers `POST /v1/webhooks/transactions`.
2. The transaction is inserted (if new) and queued in Redis.
3. The worker picks the job, simulates a 30s delay, and updates status to `PROCESSED`.
4. You can check progress anytime via `GET /v1/transactions/{transaction_id}`.

---

## ⚙️ Tech Stack

- **FastAPI** (Python 3.11)
- **SQLAlchemy ORM**
- **Redis Queue (RQ)**
- **Supabase PostgreSQL**
- **Docker + Compose**
- **Render** (for API & worker deployment)

---

## 📂 Project Structure

```
backend/
 ├── app/
 │   ├── api/
 │   │   ├── webhooks.py          # POST /v1/webhooks/transactions
 │   │   └── transactions.py      # GET /v1/transactions/{id}
 │   ├── models.py                # SQLAlchemy models
 │   ├── schemas.py               # Pydantic schemas
 │   ├── tasks.py                 # Redis queue + worker jobs
 │   ├── db.py                    # Database session setup
 │   ├── main.py                  # FastAPI entry point
 │   └── worker.py                # Background worker service
 ├── Dockerfile                   # API container build
 ├── docker-compose.yml           # API + Worker orchestration
 ├── requirements.txt             # Dependencies
 └── .env                         # Environment variables
```

---

## 🧰 Environment Setup

### 1. Prerequisites
- Python 3.11+
- Docker & Docker Compose
- Supabase account ([https://supabase.com](https://supabase.com))
- Upstash Redis account ([https://upstash.com](https://upstash.com))

### 2. Clone the Repo
```bash
git clone https://github.com/yourusername/paycheck-dashboard-backend.git
cd paycheck-dashboard-backend/backend
```

### 3. Configure `.env`
```bash
DATABASE_URL=postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres
REDIS_URL=rediss://default:<token>@<host>.upstash.io:6379
PGOPTIONS='-c inet_client_addr_family=ipv4'
```

### 4. Build and Run Locally
```bash
docker compose up --build
```

The API will start at **http://localhost:8080**

---

## 🧪 Testing the Application

### Health Check
```bash
curl http://localhost:8080/
curl http://localhost:8080/health/worker
```

### Send Transaction Webhook
```bash
curl -X POST http://localhost:8080/v1/webhooks/transactions   -H "Content-Type: application/json"   -d '{
    "transaction_id": "txn_demo_1",
    "source_account": "user_acc_1",
    "destination_account": "merchant_acc_1",
    "amount": 2500,
    "currency": "INR"
  }'
```

### Get Transaction Status
```bash
curl http://localhost:8080/v1/transactions/txn_demo_1
```

Expected progression:
1. `status: PROCESSING` (immediate response)
2. `status: PROCESSED` (after ~30s)

---

## 🧠 Features

✅ **Asynchronous background processing** via Redis RQ  
✅ **Guaranteed idempotency** using unique transaction IDs  
✅ **Persistent storage** on Supabase PostgreSQL  
✅ **Fast responses (<500ms)** to webhooks  
✅ **30-second simulated processing delay**  
✅ **Containerized architecture** for portability  

---

## 🐳 Deployment Guide (Render)

1. Push code to GitHub.
2. Create a **Web Service** in [Render](https://render.com):
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 8080`
   - Add environment variables (`DATABASE_URL`, `REDIS_URL`).
3. Create a **Background Worker** service:
   - Start Command: `python -m app.worker`
   - Same environment variables as above.

---

## 📈 Monitoring Logs

To view live logs:
```bash
docker logs backend-worker-1 -f
docker logs backend-api-1 -f
```

You’ll see detailed logs like:
```
2025-10-26 09:12:33 | INFO | app.tasks | ⚙️ Processing transaction txn_demo_1
2025-10-26 09:13:11 | INFO | app.tasks | ✅ Transaction txn_demo_1 marked as PROCESSED
```
---

## 👨‍💻 Author
**Ritesh Puvvada**  
