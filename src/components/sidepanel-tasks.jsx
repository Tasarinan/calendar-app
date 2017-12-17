import React from 'react';
import {getTime} from '../util/date';

class Tasks extends React.Component {
  static renderTask(task) {
    const completed = task.completed ? 'completed' : '';
    let time = getTime(task.startTime) || '';
    if (time && task.endTime) {
      time += ' - ' + getTime(task.endTime);
    }

    return (
      <div className={`task ${completed}`} key={task.id}>
        <div className="task-bubble" style={{ background: task.bubbleColor }}></div>
        <div className="task-content">
          <div className="task-title">
            {task.title}
          </div>
          <div className="task-time">
            {time}
          </div>
        </div>
      </div>
    );
  }

  static orderByTime(t1, t2) {
    if (t1.startTime && !t2.startTime)
      return -1;
    else if (!t1.startTime && t2.startTime)
      return 1;
    else if (t1.startTime > t2.startTime)
      return 1;
    else if (t1.startTime < t2.startTime)
      return -1;
    return 0;
  }

  render() {
    return (
      <div className="sidepanel-tasks">
        {mockedTasks.sort(Tasks.orderByTime).map(Tasks.renderTask)}
      </div>
    );
  }
}

export default Tasks;

const mockedTasks = [
  {
    id: 0,
    title: "TEDx Talk (2016 web design trends)",
    description: "I'm going to TEDx talk",
    completed: false,
    startTime: new Date(2017,11,17,14,0,0),
    endTime: new Date(2017,11,17,16,30,0),
    bubbleColor: "#B287DD",
    category: "Social",
  },
  {
    id: 1,
    title: "Buy a new telescope",
    completed: true,
    bubbleColor: "#de0f17",
    category: "Shopping",
  },
  {
    id: 3,
    title: "Dinner at the restaurant",
    description: "Get dressed not like a hobo",
    completed: false,
    startTime: new Date(2017,11,17,19,0,0),
    bubbleColor: "#B287DD",
    category: "Social",
  },
];