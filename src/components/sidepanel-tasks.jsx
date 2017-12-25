import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import TaskDetails from './task-details';
import Task from './task';
import ScrollBar from 'react-custom-scrollbars';
import { taskCategory } from '../util/mappings';
import compareBy from '../util/compare';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      taskToView: null,
    };

    this.componentWillReceiveProps(props);
    this.viewDetails = this.viewDetails.bind(this);
  }

  componentWillReceiveProps(props) {
    this.tasks = props.tasks.map(taskCategory(props.categories));
  }

  viewDetails(id) {
    this.setState({
      taskToView: !this.state.isModalOpen ? this.tasks.findIndex(t => t._id === id) : null,
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const { date, taskDateFormat, taskOrder } = this.props;
    const orderFunc = compareBy(taskOrder);
    return (
      <div className="sidepanel-tasks">
        <TaskDetails
          task={this.tasks[this.state.taskToView]}
          enabled={this.state.isModalOpen}
          close={this.viewDetails}
          dateFormat={taskDateFormat}
          completeTask={this.props.completeTask}
          deleteTask={(id) => {
            this.props.deleteTask(id);
            this.setState({ isModalOpen: false });
          }}
        />
        <ScrollBar>
        {this.tasks
          .filter(t => t.date.isSame(date, 'day'))
          .sort(orderFunc)
          .map(t =>
            <Task
              key={t._id}
              task={t}
              completeTask={this.props.completeTask}
              deleteTask={this.props.deleteTask}
              viewDetails={this.viewDetails}
            />)
        }
        </ScrollBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  categories: state.tasks.categories,
  taskDateFormat: state.app.settings.taskDateFormat,
  taskOrder: state.app.settings.taskOrder,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);