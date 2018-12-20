import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { getTime } from '../util/date';

export default ({ task, completeTask, deleteTask, viewDetails }) => {
  if (!task || !task._id) return null;

  const completed = task.completed ? 'completed' : '';
  const style = !task.completed ? { background: task.category.color } : null;

  let time = getTime(task.startTime) || '';
  if (time && task.endTime) {
    time += ' - ' + getTime(task.endTime);
  }

  return (
    <div className={`task ${completed}`}>
      <div className="task-bubble" style={style}></div>
      <div className="task-content" onClick={() => viewDetails(task._id)}>
        <div className="task-title">{task.title}</div>
        <div className="task-time">{time}</div>
      </div>
      <div className="task-controls">
        {task.completed
          ? <Clear onClick={() => completeTask(task._id, task.completed)} />
          : <Done onClick={() => completeTask(task._id, task.completed)} />
        }
        <Delete onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
}