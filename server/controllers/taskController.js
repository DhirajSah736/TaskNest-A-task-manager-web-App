import { Task } from '../models/Task.js';

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, tags, recurring } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Please add a title');
    }

    const tagsArray = Array.isArray(tags)
      ? tags.map(tag => tag.trim())
      : typeof tags === 'string'
        ? tags.split(',').map(tag => tag.trim())
        : [];

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline,
      priority,
      tags: tagsArray,
      recurring,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed, deadline, priority, tags, recurring } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    // Normalize tags
    const tagsArray = Array.isArray(tags)
      ? tags.map(tag => tag.trim())
      : typeof tags === 'string'
        ? tags.split(',').map(tag => tag.trim())
        : task.tags; // fallback to existing tags if not provided

    // Update task
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    task.deadline = deadline !== undefined ? deadline : task.deadline;
    task.priority = priority || task.priority;
    task.tags = tagsArray;
    task.recurring = recurring || task.recurring;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    
    await Task.deleteOne({ _id: req.params.id });
    
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark task as complete/incomplete
export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    
    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    
    // Toggle completed status
    task.completed = !task.completed;
    
    const updatedTask = await task.save();
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Filter tasks
export const filterTasks = async (req, res) => {
  try {
    const { status, priority, tag, search } = req.query;
    
    const query = { user: req.user._id };
    
    // Filter by status
    if (status) {
      query.completed = status === 'completed';
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};