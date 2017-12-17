import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../redux/actions/calendarActions';
import { getDaysName, getMonthName, getExt } from '../util/date';
import Tasks from './sidepanel-tasks';

class Sidepanel extends React.Component {  
  render() {
    const {weekDay, year, month, day} = this.props;
    return (
      <div className="sidepanel">
        <div className="sidepanel-info">
          <div>{getDaysName(weekDay)}</div>
          <div>{day}{getExt(day)} {getMonthName(month)} {year}</div>
        </div>
        <Tasks
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  year: state.sidepanel.year,
  month: state.sidepanel.month,
  day: state.sidepanel.day,
  weekDay: state.sidepanel.weekDay,
});

// const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps)(Sidepanel);