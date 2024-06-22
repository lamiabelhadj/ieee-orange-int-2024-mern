const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);

router.post('/', async (req, res) => {
  try {
    const { label, description, done, deadline } = req.body;
    const newTask = new Task({ label, description, done, deadline });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Task creation failed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { label, description, done, deadline } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { label, description, done, deadline }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Task update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Task deletion failed' });
  }
});

module.exports = router;




