# 🗂️ TaskFlow — Project Management App

A full-stack **Kanban project management app** with drag-and-drop task boards, JWT authentication, and real-time-ready architecture. Built with React, Node.js, Prisma, and PostgreSQL.

## 🌐 Live Demo

**App:** [https://taskflow-app-phi-seven.vercel.app](https://taskflow-app-phi-seven.vercel.app)

> Demo credentials: `demo@taskflow.app` / `Demo1234!`

## ✨ Features

- **Kanban Board** — Drag-and-drop tasks across To Do → In Progress → In Review → Done
- **Project Management** — Create and organize multiple projects
- **Task Priority** — Low / Medium / High / Urgent priority levels
- **JWT Auth** — Secure login with access + refresh token rotation
- **Responsive Design** — Works on desktop and mobile

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Drag & Drop | @hello-pangea/dnd |
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT (access + refresh tokens) |
| Deployment | Vercel |

## 📡 API Endpoints

```
POST   /api/auth/register        Register
POST   /api/auth/login           Login
POST   /api/auth/refresh         Refresh token

GET    /api/projects             List projects
POST   /api/projects             Create project
GET    /api/projects/:id/tasks   Get tasks for project

GET    /api/tasks                List tasks
POST   /api/tasks                Create task
PATCH  /api/tasks/:id            Update task (status, priority)
DELETE /api/tasks/:id            Delete task
```

## 🚀 Quick Start

```bash
git clone https://github.com/astha9900/taskflow-app.git
cd taskflow-app

# Backend
npm install
cp .env.example .env    # Add DATABASE_URL and JWT secrets
npx prisma db push
npm run dev

# Frontend (in client/)
cd client && npm install && npm run dev
```

## 📦 Environment Variables

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=5000
NODE_ENV=development
```

---

Made with ❤️ by **Astha Bharti**
