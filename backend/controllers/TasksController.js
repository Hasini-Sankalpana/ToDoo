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

export const getUserTasks = async (req, res) => {
    const userId = req.user._id;

    try {
        const tasks = await Task.find({ userId }).exec();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks', error });
    }
};

export const editTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, dueDate, dueTime, priority, notes } = req.body;
    const userId = req.user._id;

    try {
        const task = await Task.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.dueDate = dueDate || task.dueDate; 
        task.dueTime = dueTime || task.dueTime;
        task.priority = priority || task.priority;
        task.notes = notes || task.notes;

        await task.save();

        res.status(200).json({ task });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task', error });
    }
}

export const deleteTask = async (req, res) => {
    const {taskId} = req.params;
    const userId = req.user._id;

    try{
        const task = await Task.findOneAndDelete({ _id:taskId, userId})

        if(!task){
            return res.status(404).json({message:'Task not Found'})
        }

        res.status(200).json({message:'Task deleted successfully'})
    }catch(error){
        console.error('Error deleting task:',error)
        res.status(500).json({message:'Failed to delete task', error})
    }
}