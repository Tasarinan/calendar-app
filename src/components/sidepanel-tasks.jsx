import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import Task from './task';

class Tasks extends React.Component {
  static orderByTime(t1, t2) {
    if (t1.startTime && !t2.startTime)
      return -1;
    else if (!t1.startTime && t2.startTime)
      return 1;
    else if (t1.startTime > t2.startTime)
      return 1;
    else if (t1.startTime < t2.startTime)
      return -1;
    return 0;
  }

  constructor(props) {
    super(props);

    this.filterTasks = this.filterTasks.bind(this);
  }

  filterTasks(task) {
    const { day, month, year } = this.props;
    return task.date.getDate() === day &&
      task.date.getMonth() + 1 === month &&
      task.date.getFullYear() === year;
  }

  render() {
    return (
      <div className="sidepanel-tasks">
        {this.props.tasks
          .filter(this.filterTasks)
          .sort(Tasks.orderByTime)
          .map(t =>
            <Task
              task={t}
              completeTask={this.props.completeTask}
              deleteTask={this.props.deleteTask}
            />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ tasks: state.tasks.items });

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);