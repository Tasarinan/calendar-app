import React from 'react';
import shortId from 'shortid';
import Day from './calendar-day';
import MonthSelector from './calendar-month-selector';
import * as dateUtil from '../util/date';

class Calendar extends React.Component {
  constructor() {
    super();

    const date = new Date();
    this.state = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    this.changeMonth = this.changeMonth.bind(this);
  }

  getDays() {
    const {year, month} = this.state;
    const mapFunc = row => (
      <div className="calendar-row flex" key={shortId.generate()}>
        {row.map(d => <Day
                        number={d}
                        key={shortId.generate()}
                        today={dateUtil.isToday(year, month, d)}
                      />)}
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
    const days = dateUtil.getDays(year, month, 1); //Week starts on monday

    return [nameRow, ...days.map(mapFunc)];
  }

  changeMonth(forward) {
    const changed = dateUtil.resolveMonthChange(
      this.state.year,
      this.state.month,
      forward,
    );
    this.setState({
      month: changed.month+1,
      year: changed.year,
    });
  }
  
  render() {
    const {year, month} = this.state;
    return (
      <div className="calendar">
        <MonthSelector
          month={dateUtil.getMonthName(month)}
          year={year}
          changeMonth={this.changeMonth}
        />
        {this.getDays()}
      </div>
    );
  }
}

export default Calendar;