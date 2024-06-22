import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
