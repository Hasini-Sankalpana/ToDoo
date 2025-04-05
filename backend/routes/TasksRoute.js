import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {createTask} from '../controllers/TasksController.js';

const Taskrouter = express.Router();

Taskrouter.post('/createtasks', authMiddleware, createTask);


export default Taskrouter;