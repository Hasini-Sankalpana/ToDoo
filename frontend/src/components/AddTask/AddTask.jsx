import React, { useEffect, useState } from 'react';
import './AddTask.css';
import { RiCalendarLine, RiFlagLine, RiTimeLine } from 'react-icons/ri';

function AddTask({ isOpen, onClose, taskToEdit, onTaskUpdate }) {
  const [task, setTask] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(taskToEdit) {
      setTask({
        title: taskToEdit.title,
        dueDate: taskToEdit.dueDate,
        dueTime: taskToEdit.dueTime,
        priority: taskToEdit.priority,
        notes: taskToEdit.notes
      });
    }else{
      setTask({
        title: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        notes: ''
      });
    }
  }, [taskToEdit]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors = {};
    if (!task.title.trim()) errors.title = 'Title is required.';
    if (!task.dueDate) errors.dueDate = 'Due date is required.';
    if (task.dueDate) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 
      if (new Date(task.dueDate) < currentDate) {
        errors.dueDate = 'Due date cannot be in the past.';
      }
    }
    if (!task.dueTime) errors.dueTime = 'Due time is required.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 

    try {
      const token = localStorage.getItem('token');
      const url = taskToEdit 
      ? `http://localhost:3000/api/tasks/edittasks/${taskToEdit._id}`
      : 'http://localhost:3000/api/tasks/createtasks';
    
    const method = taskToEdit ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(task),
    });

      const data = await response.json();
      console.log('Task created:', data);

      if (response.ok) {
       if (taskToEdit) {
          onTaskUpdate(data.task);
        }else{
          onClose(data.task);
        }
      //  console.log('Task created:', data);

      } else {
        console.error('Error creating task:', data);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleClose = () => {
    setTask({
      title: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-task-overlay" onClick={onClose}>
      <div className="add-task-content" onClick={e => e.stopPropagation()}>
        <div className="add-task-header">  
          <h2>{taskToEdit ? 'Edit task':'Add New Task'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title*</label>
            <input
              name="title"
              type="text"
              value={task.title}
              onChange={handleChange}
              placeholder="Add your task here..."
              autoFocus
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><RiCalendarLine /> Due Date</label>
              <input 
                name="dueDate"
                type="date" 
                value={task.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && <p className="error">{errors.dueDate}</p>}
            </div>

            <div className="form-group">
              <label><RiTimeLine /> Time</label>
              <input
                name="dueTime"
                type="time"
                value={task.dueTime}
                onChange={handleChange}
              />
              {errors.dueTime && <p className="error">{errors.dueTime}</p>}
            </div>

            <div className="form-group">
              <label><RiFlagLine /> Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={task.notes}
              onChange={handleChange}
              placeholder="Additional details..."
              rows="3"
            />
          </div>

          <div className="add-task-actions">
            <button type="button" onClick={handleClose}>Cancel</button>
            <button type="submit" className="primary"> {taskToEdit ? 'Update Task' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
