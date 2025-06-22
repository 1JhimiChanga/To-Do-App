import express from "express";
import TaskList from "../models/TaskList.js";
import Task from "../models/Task.js";

const router = express.Router();

// Get all task lists
router.get("/", async (req, res) => {
  const lists = await TaskList.find().populate("tasks");
  res.json(lists);
});

// Create a new task list
router.post("/", async (req, res) => {
  const newList = new TaskList({ name: req.body.name });
  const saved = await newList.save();
  res.status(201).json(saved);
});

// Add a task to a list
router.post("/:listId/tasks", async (req, res) => {
  const { listId } = req.params;
  const task = new Task({ ...req.body, taskList: listId });
  const savedTask = await task.save();

  await TaskList.findByIdAndUpdate(listId, {
    $push: { tasks: savedTask._id },
  });

  res.status(201).json(savedTask);
});

export default router;
