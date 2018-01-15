import React from 'react';
import shortId from 'shortid';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/calendarActions';
import Day from './calendar-day';
import MonthSelector from './calendar-month-selector';
import { getDays } from '../util/date';
import { taskCategory } from '../util/mappings';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    this.tasks = props.tasks.map(taskCategory(props.categories));
  }

  changeFocusedDay = (date) => {
    if (!this.props.date.isSame(date, 'month')) {
      this.props.changeDate(date);
    }
    this.props.changeFocusedDay(date);
  }

  changeMonth = (forward) => {
    const m = moment(this.props.date);
    forward ? m.add(1, 'month') : m.subtract(1, 'month');
    this.props.changeDate(m);
  }

  countWeekTasks = (date) => {
    if (this.props.showWeekTaskCount && this.props.showWeeks) {
      const countCompleted = (t) => {
        if (!this.props.countCompletedTasks && t.completed){
          return false;
        }
        return true;
      };
      const filterByCategory = (t) => (
        this.props.taskCountCategory === '*' ? 
          true :
          t.category._id === this.props.taskCountCategory
      )

      const start = moment(date).startOf('week').add(this.props.weekStart, 'day');
      const end = moment(date).endOf('week').add(this.props.weekStart, 'day');
      const count = this.tasks.filter(t => 
        t.date.isBetween(start, end) && 
        countCompleted(t) && 
        filterByCategory(t)
      ).length;
      return count > 0 ? <div className="task-count"><div>{count}</div></div> : null;
    }
    return null;
  }

  getDays = () => {
    const weekClass = this.props.showWeeks ? 'weeks' : '';
    const mapFunc = row => {
      const day = moment(this.props.date).date(row[0]);
      let week = day.week() - (this.props.weekNumberStart - 1);
      if (week < 1) {
        week += 52;
      }
      return (
        <div className={`calendar-row flex ${weekClass}`} key={shortId.generate()}>
          <div className="week-number">
            {this.countWeekTasks(day)}
            {week}
          </div>
          {row.map(this.mapRowDays)}
        </div>
      )
    };

    const nameRow = this.getDayNames(weekClass);
    const days = getDays(this.props.date, this.props.weekStart);

    return [nameRow, ...days.map(mapFunc)];
  }

  getDayNames = (weekClass) => {
    let names = moment.weekdaysShort();
    if (this.props.weekStart === 1) {
      names.push(names.shift());
    }
    if (this.props.showWeeks) {
      names.unshift('W');
    }
    names = names.map(n => (
      <div
        className={`calendar-day-name ${weekClass}`}
        key={shortId.generate()}
      >{n}</div>
    ));

    return <div className="flex" key={shortId.generate()}>{names}</div>;
  }

  mapRowDays = (d) => {
    const {date, focusedDate} = this.props;
    const thisDate = moment(date).date(d);
    return <Day
        number={thisDate.date()}
        disabled={d <= 0 || d > date.daysInMonth()}
        key={shortId.generate()}
        today={moment().isSame(thisDate, 'day')}
        focused={focusedDate.isSame(thisDate, 'day')}
        onClick={() => this.changeFocusedDay(thisDate)}
        taskColors={this.tasks
          .filter(t => t.date.isSame(thisDate, 'day'))
          .map(t => t.completed ? null : t.category.color)
        }
        showCount={this.props.showTaskCount}
        countCompleted={this.props.countCompletedTasks}
      />
  }

  render() {
    const {date} = this.props;
    return (
      <div className="calendar">
        <MonthSelector
          month={date.format('MMMM')}
          year={date.year()}
          changeMonth={this.changeMonth}
        />
        {this.getDays()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.calendar.date,
  focusedDate: state.calendar.focusedDate,
  tasks: state.tasks.items,
  categories: state.tasks.categories,
  weekStart: state.app.settings.weekStart,
  showWeeks: state.app.settings.showWeeks,
  weekNumberStart: state.app.settings.weekNumberStart,
  showTaskCount: state.app.settings.showTaskCount,
  showWeekTaskCount: state.app.settings.showWeekTaskCount,
  countCompletedTasks: state.app.settings.countCompletedTasks,
  taskCountCategory: state.app.settings.taskCountCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);