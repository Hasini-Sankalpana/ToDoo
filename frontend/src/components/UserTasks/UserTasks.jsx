import React from 'react';
import { useState } from 'react';
import './UserTasks.css';
import 'remixicon/fonts/remixicon.css';
import AddTask from '../AddTask/AddTask';

function UserTasks() {

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='user-tasks'>
      <div className="add-tasks">
        <div className="add-icon" onClick={()=> setIsAddTaskOpen(true)}><i class="ri-add-large-line"></i></div> 
        <h2> Add Task</h2>
      </div>

      <div className="tasks-list">
        <div className="task-list-head">
        <div className="list-title">
          <h2>Task List</h2>
        </div>
        <div className="list-status">
        <button className='today'>Today</button>
        <button className='overdue'>Overdue</button>
        <button className='completed'>Completed</button>
        </div>
        </div>
        <div className="task-list-sort">
            <h5>Sort By : </h5>
            <select name="sort" id="sort">
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
        </div>
        <div className="task-list-container">
          <div className="task">
          <h5><AddTask
            isOpen={isAddTaskOpen}
            onClose={() => setIsAddTaskOpen(false)}
            onTaskAdd={handleAddTask}
          /></h5>
           <div className="task-actions">
           <i class="ri-pencil-fill"></i>
           <i class="ri-delete-bin-6-fill"></i>
           <i class="ri-checkbox-circle-fill"></i>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTasks;