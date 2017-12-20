import React from 'react';
import shortId from 'shortid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators1 from '../redux/actions/calendarActions';
import * as actionCreators2 from '../redux/actions/sidepanelActions';
import Day from './calendar-day';
import MonthSelector from './calendar-month-selector';
import * as dateUtil from '../util/date';

const actionCreators = {
  ...actionCreators1,
  ...actionCreators2,
};

class Calendar extends React.Component {
  constructor() {
    super();

    this.changeMonth = this.changeMonth.bind(this);
    this.changeFocusedDay = this.changeFocusedDay.bind(this);
  }

  changeFocusedDay(y, m, d) {
    if (d <= 0) {
      this.changeMonth(d > -15);
      this.props.changeFocusedDay(y, d > -15 ? m : m-2, d * -1);
      return;
    }
    this.props.changeFocusedDay(y, m-1, d);
  }

  getDays() {
    const {year, month, fYear, fMonth, fDay} = this.props;
    const mapFunc = row => (
      <div className="calendar-row flex" key={shortId.generate()}>
        {row.map(d => <Day
                        number={d}
                        key={shortId.generate()}
                        today={dateUtil.isToday(year, month, d)}
                        focused={year === fYear && month === fMonth && d === fDay}
                        onClick={() => this.changeFocusedDay(year, month, d)}
                        taskColors={this.props.tasks
                          .filter(t => dateUtil.dateEquals(t.date, year, month, d))
                          .map(t => t.completed ? null : t.category.color)
                        }
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
      this.props.year,
      this.props.month,
      forward,
    );
    this.props.changeDate(changed.year, changed.month + 1);
  }

  render() {
    const {year, month} = this.props;
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

const mapStateToProps = state => ({
  year: state.calendar.year,
  month: state.calendar.month,
  fYear: state.sidepanel.year,
  fMonth: state.sidepanel.month,
  fDay: state.sidepanel.day,
  tasks: state.tasks.items,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);