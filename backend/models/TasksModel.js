import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    dueTime: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    notes: {
        type: String,
        default: '',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;
