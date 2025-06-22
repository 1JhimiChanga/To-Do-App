const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: Date,
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    tags: [String],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
