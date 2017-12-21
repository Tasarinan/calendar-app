import React from 'react';
import { getTime } from '../util/date';

export default ({ task, completeTask, deleteTask, viewDetails }) => {
  const completed = task.completed ? 'completed' : '';
  const style = !task.completed ? { background: task.category.color } : null;
  const check = `${task.completed ? 'un' : ''}check.png`;
  let time = getTime(task.startTime) || '';
  if (time && task.endTime) {
    time += ' - ' + getTime(task.endTime);
  }

  return (
    <div className={`task ${completed}`}>
      <div className="task-bubble" style={style}></div>
      <div className="task-content" onClick={() => viewDetails(task._id)}>
        <div className="task-title">
          {task.title}
        </div>
        <div className="task-time">
          {time}
        </div>
      </div>
      <div className="task-controls">
        <img
          src={require(`../styles/${check}`)}
          alt="complete"
          onClick={() => completeTask(task._id, task.completed)}
        />
        <img
          src={require('../styles/trashcan.png')}
          alt="delete"
          onClick={() => deleteTask(task._id)}
        />
      </div>
    </div>
  );
}