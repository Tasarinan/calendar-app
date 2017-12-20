import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../redux/actions/calendarActions';
import { getDaysName, getMonthName, getExt } from '../util/date';
import Tasks from './sidepanel-tasks';
import NewTask from './task-new';

class Sidepanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = { isModalOpen: false };

    this.toggleNewTaskModal = this.toggleNewTaskModal.bind(this);
  }

  toggleNewTaskModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const {weekDay, year, month, day} = this.props;
    return (
      <div className="sidepanel">
        <NewTask
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleNewTaskModal}
          date={{year, month, day}}
        />
        <div className="sidepanel-info">
          <div>{getDaysName(weekDay)}</div>
          <div>{day}{getExt(day)} {getMonthName(month)} {year}</div>
        </div>
        <Tasks
          year={year}
          month={month}
          day={day}
        />
        <div className="sidepanel-controls">
          <img src={require('../styles/settings.ico')} alt="Settings"/>
          <img
            src={require('../styles/add.png')}
            alt="New task"
            onClick={this.toggleNewTaskModal}
          />
        </div>
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