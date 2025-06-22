import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    name: { type: String, required: true },
    date: { type: String },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    tags: [String],
    completed: { type: Boolean, default: false },
    taskList: { type: Schema.Types.ObjectId, ref: "TaskList" },
}, { timestamps: true });
export default mongoose.model("Task", TaskSchema);
