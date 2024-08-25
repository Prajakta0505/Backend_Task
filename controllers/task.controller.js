const db = require('../models');
const Task = db.tasks;

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findOne({ where: { id: taskId, userId: req.userId } });
    if (!task) {
      return res.status(404).send({ message: 'Task not found.' });
    }

    await task.update(req.body);
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findOne({ where: { id: taskId, userId: req.userId } });
    if (!task) {
      return res.status(404).send({ message: 'Task not found.' });
    }

    await task.destroy();
    res.status(200).send({ message: 'Task deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
