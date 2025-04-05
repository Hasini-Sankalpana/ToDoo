import Task from '../models/TasksModel.js';

export const createTask = async (req, res) => {
    const { title, dueDate, dueTime, priority, notes } = req.body;
    const userId = req.user._id;

    try {
        const task = new Task({
            title,
            dueDate,
            dueTime,
            priority,
            notes,
            userId
        });

        await task.save();
        res.status(201).json({ task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task', error });
    }
}

