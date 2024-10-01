import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
  task: string;
  isComplete: boolean;
}

const todoSchema: Schema<ITodo> = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
});

const TodoModel =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);
export default TodoModel;
