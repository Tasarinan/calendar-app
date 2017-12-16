import React from 'react';
import shortId from 'shortid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/calendarActions';
import Day from './calendar-day';
import MonthSelector from './calendar-month-selector';
import * as dateUtil from '../util/date';

class Calendar extends React.Component {
  constructor() {
    super();

    this.changeMonth = this.changeMonth.bind(this);
  }

  getDays() {
    const {year, month} = this.props;
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
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);