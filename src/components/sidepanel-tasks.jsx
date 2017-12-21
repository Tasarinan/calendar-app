import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import TaskDetails from './task-details';
import Task from './task';
import { taskCategory } from '../util/mappings';

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
    this.state = {
      isModalOpen: false,
      taskToView: {},
    };

    this.componentWillReceiveProps(props);
    this.filterTasks = this.filterTasks.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }

  componentWillReceiveProps(props) {
    this.tasks = props.tasks.map(taskCategory(props.categories));
  }

  filterTasks(task) {
    const { day, month, year } = this.props;
    return task.date.getDate() === day &&
      task.date.getMonth() + 1 === month &&
      task.date.getFullYear() === year;
  }

  viewDetails(id) {
    this.setState({
      taskToView: !this.state.isModalOpen ? this.tasks.find(t => t._id === id) : {},
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div className="sidepanel-tasks">
        <TaskDetails
          task={this.state.taskToView}
          enabled={this.state.isModalOpen}
          close={this.viewDetails}
          completeTask={(...args) => {
            this.props.completeTask(...args);
            this.setState({
              taskToView: {
                ...this.state.taskToView,
                completed: !this.state.taskToView.completed
              }
            });
          }}
          deleteTask={(id) => {
            this.props.deleteTask(id);
            this.setState({ isModalOpen: false });
          }}
        />
        {this.tasks
          .filter(this.filterTasks)
          .sort(Tasks.orderByTime)
          .map(t =>
            <Task
              key={t._id}
              task={t}
              completeTask={this.props.completeTask}
              deleteTask={this.props.deleteTask}
              viewDetails={this.viewDetails}
            />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  categories: state.tasks.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);