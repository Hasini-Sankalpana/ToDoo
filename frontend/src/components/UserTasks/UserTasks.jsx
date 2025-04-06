import React from 'react';
import { useState, useEffect } from 'react';
import './UserTasks.css';
import 'remixicon/fonts/remixicon.css';
import AddTask from '../AddTask/AddTask';

function UserTasks() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleToggleTaskDetails = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsAddTaskOpen(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    setIsAddTaskOpen(false);
    setEditingTask(null);
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks/gettasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/deletetasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } else {
        const data = await response.json();
        console.error('Error deleting task:', data);
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the task');
    }
  };

  const filterTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        return tasks.filter(task => {
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
      case 'overdue':
        return tasks.filter(task => {
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate < today;
        });
      default:
        return tasks;
    }
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        const timeA = a.dueTime || '23:59';
        const timeB = b.dueTime || '23:59';
        return timeA.localeCompare(timeB);
      }
    });
  };

  const getFormattedDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredAndSortedTasks = sortTasks(filterTasks());
  

  return (
    <div className='user-tasks'>
      <div className="add-tasks">
        <div className="add-icon" onClick={() => setIsAddTaskOpen(true)}>
          <i className="ri-add-large-line"></i>
        </div> 
        <h2>Add Task</h2>
      </div>

      <AddTask
        isOpen={isAddTaskOpen}
        onClose={(newTask) => {
          setIsAddTaskOpen(false);
          if (newTask && !editingTask) {
            setTasks(prev => [...prev, newTask]);
          }
          setEditingTask(null);
        }}
        taskToEdit={editingTask}
        onTaskUpdate={handleTaskUpdate}
      />

      <div className="tasks-list">
        <div className="task-list-head">
          <div className="list-title">
            <h2>Task List</h2>
          </div>
          <div className="list-status">
          <button 
              className={`toggle-filter ${filter === 'today' ? 'today active' : ''}`}
              onClick={() => setFilter(filter === 'today' ? 'all' : 'today')}
            >
              {filter === 'today' ? 'All Tasks' : 'Today'}
            </button>
            <button 
              className={`overdue ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
          </div>
        </div>

        <div className="task-list-sort">
          <h5>Sort By:</h5>
          <select 
            name="sort" 
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className="task-list-container">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredAndSortedTasks.length === 0 ? (
            <div className="no-tasks">No tasks found</div>
          ) : (
            filteredAndSortedTasks.map((task) => (
              <div key={task._id} className="task">
                <div className="task-content" onClick={() => handleToggleTaskDetails(task._id)}>
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-details">
                    <span className="task-date">
                      <i className="ri-calendar-line"></i> {getFormattedDate(task.dueDate)}
                    </span>
                    {task.dueTime && (
                      <span className="task-time">
                        <i className="ri-time-line"></i> {task.dueTime}
                      </span>
                    )}
                  </div>
                  {expandedTask === task._id && (
                  <div className="task-notes">
                    <p>{task.notes}</p>
                    </div>
                )}
                </div>
                <div className="task-actions">
                  <div className="tooltip" onClick={() => handleEditClick(task)}>
                    <i className="ri-pencil-fill"></i>
                    <span className="tooltip-text">Edit</span>
                  </div>
                  <div className="tooltip" onClick={() => handleDeleteTask(task._id)}>
                    <i className="ri-delete-bin-6-fill"></i>
                    <span className="tooltip-text">Delete</span>
                  </div>
                </div>
               
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserTasks;