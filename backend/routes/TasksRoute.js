import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {createTask, deleteTask, editTask, getUserTasks} from '../controllers/TasksController.js';

const Taskrouter = express.Router();

Taskrouter.post('/createtasks', authMiddleware, createTask);
Taskrouter.get('/gettasks', authMiddleware, getUserTasks);
Taskrouter.patch('/edittasks/:taskId', authMiddleware, editTask);
Taskrouter.delete('/deletetasks/:taskId',authMiddleware,deleteTask)


export default Taskrouter;