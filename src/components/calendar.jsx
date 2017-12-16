import React from 'react';
import shortId from 'shortid';
import Day from './calendar-day';
import MonthSelector from './calendar-month-selector';
import {getDays} from '../util/date';

class Calendar extends React.Component {
  static getDays(year, month) {
    const mapFunc = row => (
      <div className="calendar-row flex" key={shortId.generate()}>
        {row.map(d => <Day number={d} key={shortId.generate()}/>)}
      </div>
    );

    const names = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
      .map(n => (
        <div
          className="calendar-day-name"
          key={shortId.generate()}
        >{n}</div>
      ));
    const nameRow = <div className="flex" key={shortId.generate()}>{names}</div>;
    const days = getDays(year, month, 1); //Week starts on monday

    return [nameRow, ...days.map(mapFunc)];
  }
  
  render() {
    return (
      <div className="calendar">
        <MonthSelector
          month="December"
          year={2015}
        />
        {Calendar.getDays(2015, 12)}
      </div>
    );
  }
}

export default Calendar;