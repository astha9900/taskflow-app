const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const memberships = await prisma.projectMember.findMany({
      where: { userId: req.userId },
      include: { project: { include: { _count: { select: { tasks: true, members: true } } } } },
    });
    res.json(memberships.map((m) => m.project));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Project name is required" });

    const project = await prisma.project.create({
      data: {
        name,
        description,
        members: { create: { userId: req.userId, role: "OWNER" } },
      },
      include: { _count: { select: { tasks: true, members: true } } },
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tasks", async (req, res, next) => {
  try {
    const member = await prisma.projectMember.findFirst({
      where: { projectId: req.params.id, userId: req.userId },
    });
    if (!member) return res.status(403).json({ error: "Not a project member" });

    const tasks = await prisma.task.findMany({
      where: { projectId: req.params.id },
      include: { assignee: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const member = await prisma.projectMember.findFirst({
      where: { projectId: req.params.id, userId: req.userId, role: "OWNER" },
    });
    if (!member) return res.status(403).json({ error: "Only project owner can delete" });

    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
