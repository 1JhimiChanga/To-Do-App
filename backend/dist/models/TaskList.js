import mongoose, { Schema } from "mongoose";
const TaskListSchema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});
export default mongoose.model("TaskList", TaskListSchema);
