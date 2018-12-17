import React from 'react';
import { Badge } from '@material-ui/core';

export default (props) => {
  const today = props.today ? 'calendar-today' : '';
  const focused = props.focused ? 'calendar-day-focused' : '';
  let number = props.number;
  const disabled = props.disabled ? 'disabled' : '';

  const tasks = props.taskColors && props.taskColors.length > 0 ?
    props.taskColors.sort().map((c, i) => <div style={{ background: c }} key={i} />) :
    null;
  const shadow = tasks ? 'calendar-day-task-shadow' : '';
  
  let taskCount = 0;
  if (tasks && props.showCount) {
    taskCount = props.countCompleted ? 
      tasks.length :
      props.taskColors.filter((t) => !!t).length;
  }
  const hiddenBadge = taskCount ? '' : 'hide-badge';

  return (
    <div className={`calendar-day ${disabled} ${today} ${focused}`} onClick={props.onClick}>
      <Badge
        badgeContent={taskCount}
        className={`badge day-task-count ${hiddenBadge}`}
      >
        <div>{number}</div>
      </Badge>
      <div className={`calendar-day-tasks ${shadow}`}>
        {tasks}
      </div>
    </div>
  );
};