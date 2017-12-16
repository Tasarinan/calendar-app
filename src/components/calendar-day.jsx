import React from 'react';

export default (props) => {
  const today = props.today ? 'calendar-today' : '';
  let number = props.number;
  let disabled = '';
  if (props.number <= 0) {
    number = props.number * -1;
    disabled = 'disabled';
  }
  
  return (
    <div className={`calendar-day ${disabled} ${today}`}>
      <div>{number}</div>
    </div>
  );
};