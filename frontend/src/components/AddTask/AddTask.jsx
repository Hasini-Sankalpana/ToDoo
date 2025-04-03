import React, { useState } from 'react';
import './AddTask.css';
import { RiCalendarLine, RiFlagLine, RiTimeLine } from 'react-icons/ri';

function AddTask({ isOpen, onClose }) {
  const [task, setTask] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    console.log('Task to be saved:', task);
    onClose();
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
          <h2>Add New Task</h2>
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
              required
            />
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
            </div>

            <div className="form-group">
              <label><RiTimeLine /> Time</label>
              <input
                name="dueTime"
                type="time"
                value={task.dueTime}
                onChange={handleChange}
              />
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
            <button type="submit" className="primary">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;