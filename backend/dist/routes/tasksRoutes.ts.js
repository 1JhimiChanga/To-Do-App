import express from "express";
import Task from "../models/Task";
const router = express.Router();
router.put("/:id", async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updated);
});
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});
export default router;
