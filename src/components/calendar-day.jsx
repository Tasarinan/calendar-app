import React from 'react';

export default (props) => {
  const today = props.today ? 'calendar-today' : '';
  const focused = props.focused ? 'calendar-day-focused' : '';
  let number = props.number;
  const disabled = props.disabled ? 'disabled' : '';

  const tasks = props.taskColors && props.taskColors.length > 0 ?
    props.taskColors.sort().map((c, i) => <div style={{ background: c }} key={i} />) :
    null;
  const style = tasks ? { boxShadow : '0 0 2px 1px #442a4d' } : null;
  return (
    <div className={`calendar-day ${disabled} ${today} ${focused}`} onClick={props.onClick}>
      <div>{number}</div>
      <div className="calendar-day-tasks" style={style}>
        {tasks}
      </div>
    </div>
  );
};