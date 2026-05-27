const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/", async (req, res, next) => {
  try {
    const { title, description, projectId, status, priority, dueDate, assigneeId } = req.body;

    // verify user is project member
    const member = await prisma.projectMember.findFirst({
      where: { projectId, userId: req.userId },
    });
    if (!member) return res.status(403).json({ error: "Not a project member" });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        status: status || "TODO",
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId: assigneeId || null,
        creatorId: req.userId,
      },
      include: { assignee: { select: { id: true, name: true } } },
    });

    // broadcast to project members
    const members = await prisma.projectMember.findMany({ where: { projectId } });
    req.app.locals.broadcast(
      members.map((m) => m.userId),
      { type: "task:created", task }
    );

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const member = await prisma.projectMember.findFirst({
      where: { projectId: task.projectId, userId: req.userId },
    });
    if (!member) return res.status(403).json({ error: "Forbidden" });

    const updated = await prisma.task.update({
      where: { id: req.params.id },
      data: req.body,
      include: { assignee: { select: { id: true, name: true } } },
    });

    const members = await prisma.projectMember.findMany({
      where: { projectId: task.projectId },
    });
    req.app.locals.broadcast(
      members.map((m) => m.userId),
      { type: "task:updated", task: updated }
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const member = await prisma.projectMember.findFirst({
      where: { projectId: task.projectId, userId: req.userId },
    });
    if (!member) return res.status(403).json({ error: "Forbidden" });

    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
