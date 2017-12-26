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
  const taskCount = tasks && props.showCount ?
    <div className="task-count"><div>{tasks.length}</div></div> 
    : null;
  return (
    <div className={`calendar-day ${disabled} ${today} ${focused}`} onClick={props.onClick}>
      {taskCount}
      <div>{number}</div>
      <div className={`calendar-day-tasks ${shadow}`}>
        {tasks}
      </div>
    </div>
  );
};