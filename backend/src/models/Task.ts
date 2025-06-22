import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  date: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  completed: boolean;
  taskList: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    tags: [String],
    completed: { type: Boolean, default: false },
    taskList: { type: Schema.Types.ObjectId, ref: "TaskList" },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
