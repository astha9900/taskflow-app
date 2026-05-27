# 🗂️ TaskFlow — Full Stack Project Management App

A production-ready project management application built with React, Node.js, and PostgreSQL. Features JWT authentication, real-time task updates, drag-and-drop boards, and team collaboration.

## 🌐 Live Demo

**[deploy-taskflow.vercel.app](https://deploy-taskflow.vercel.app)**

## ✨ Features

- **Authentication** — JWT-based login/signup with refresh tokens
- **Kanban Board** — Drag-and-drop task management (Todo → In Progress → Done)
- **Projects & Teams** — Create projects, invite team members, assign tasks
- **Real-time Updates** — WebSocket integration for live board changes
- **Priority & Due Dates** — Set task priority, labels, and deadlines
- **Dark/Light Mode** — Full theme support
- **Responsive UI** — Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Query, React Beautiful DnD
**Backend:** Node.js, Express.js, WebSocket (ws)
**Database:** PostgreSQL with Prisma ORM
**Auth:** JWT (access + refresh tokens), bcrypt
**Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# Clone the repo
git clone https://github.com/astha9900/taskflow-app.git
cd taskflow-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL, JWT_SECRET, etc.

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 📁 Project Structure

```
taskflow-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Auth & Theme context
│   │   └── api/            # API service functions
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── controllers/    # Business logic
│   │   └── prisma/         # DB schema & migrations
│   └── index.js
│
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, get tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/projects` | Get user's projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id/tasks` | Get project tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task (status, assignee) |
| DELETE | `/api/tasks/:id` | Delete task |

## 🧪 Running Tests

```bash
npm test
```

## 📄 License

MIT © [Astha Bharti](https://github.com/astha9900)
