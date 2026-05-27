const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");
const projectRoutes = require("./src/routes/projects");
const { authenticateToken } = require("./src/middleware/auth");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// no-op broadcast since WebSockets aren't supported on Vercel serverless
app.locals.broadcast = () => {};

app.get("/", (_, res) => res.json({ name: "TaskFlow API", version: "1.0.0", status: "running" }));
app.get("/health", (_, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", authenticateToken, projectRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));
}

module.exports = app;
