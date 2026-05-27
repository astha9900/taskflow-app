const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");

const authRoutes = require("./src/routes/auth");
const projectRoutes = require("./src/routes/projects");
const taskRoutes = require("./src/routes/tasks");
const { authenticateToken } = require("./src/middleware/auth");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", authenticateToken, projectRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

// WebSocket: broadcast task updates to project members
const clients = new Map(); // userId -> ws

wss.on("connection", (ws, req) => {
  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    if (msg.type === "auth") {
      clients.set(msg.userId, ws);
    }
  });
  ws.on("close", () => {
    for (const [uid, client] of clients) {
      if (client === ws) clients.delete(uid);
    }
  });
});

app.locals.broadcast = (userIds, payload) => {
  userIds.forEach((uid) => {
    const client = clients.get(uid);
    if (client && client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
