import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import { getTime } from '../util/date';

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

    this.renderTask = this.renderTask.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
  }

  renderTask(task) {
    const completed = task.completed ? 'completed' : '';
    const style = !task.completed ? { background: task.bubbleColor } : null;
    const check = `${task.completed ? 'un' : ''}check.png`;
    let time = getTime(task.startTime) || '';
    if (time && task.endTime) {
      time += ' - ' + getTime(task.endTime);
    }

    return (
      <div className={`task ${completed}`} key={task.id}>
        <div className="task-bubble" style={style}></div>
        <div className="task-content">
          <div className="task-title">
            {task.title}
          </div>
          <div className="task-time">
            {time}
          </div>
        </div>
        <div className="task-controls">
          <img
            src={require(`../styles/${check}`)}
            alt="complete"
            onClick={() => this.props.completeTask(task.id, task.completed)}
          />
          <img
            src={require('../styles/trashcan.png')}
            alt="delete"
            onClick={() => this.props.deleteTask(task.id)}
          />
        </div>
      </div>
    );
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
          .map(this.renderTask)}
      </div>
    );
  }
}

const mapStateToProps = state => ({ tasks: state.tasks.items });

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);