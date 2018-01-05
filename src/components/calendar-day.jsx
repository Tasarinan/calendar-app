import React from 'react';

export default (props) => {
  const today = props.today ? 'calendar-today' : '';
  const focused = props.focused ? 'calendar-day-focused' : '';
  let number = props.number;
  const disabled = props.disabled ? 'disabled' : '';

  const tasks = props.taskColors && props.taskColors.length > 0 ?
    props.taskColors.sort().map((c, i) => <div style={{ background: c }} key={i} />) :
    null;
  const shadow = tasks ? 'calendar-day-task-shadow' : '';
  
  let taskCountNumber = null;
  if (tasks && props.showCount) {
    const taskCount = props.countCompleted ? 
      tasks.length :
      props.taskColors.filter((t) => !!t).length;
    taskCountNumber = taskCount ? 
      <div className="task-count"><div>{taskCount}</div></div>
      : null;
  }
  return (
    <div className={`calendar-day ${disabled} ${today} ${focused}`} onClick={props.onClick}>
      {taskCountNumber}
      <div>{number}</div>
      <div className={`calendar-day-tasks ${shadow}`}>
        {tasks}
      </div>
    </div>
  );
};