import mongoose, { Schema, Document } from "mongoose";

export interface ITaskList extends Document {
  name: string;
  tasks: mongoose.Types.ObjectId[];
}

const TaskListSchema: Schema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model<ITaskList>("TaskList", TaskListSchema);
