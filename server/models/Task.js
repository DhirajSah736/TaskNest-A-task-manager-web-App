import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],
  deadline: {
    type: Date
  },
  recurring: {
    type: String,
    enum: ['none', 'daily', 'weekly'],
    default: 'none'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Task = mongoose.model('Task', taskSchema);