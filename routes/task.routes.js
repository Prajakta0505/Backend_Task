const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/tasks', verifyToken, createTask);
router.get('/tasks', verifyToken, getTasks);
router.put('/tasks/:taskId', verifyToken, updateTask);
router.delete('/tasks/:taskId', verifyToken, deleteTask);

module.exports = router;
