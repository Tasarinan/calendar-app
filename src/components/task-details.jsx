import React from 'react';
import Modal from './modal';
import { getTime } from '../util/date';
import EditTask from './task-new';

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  }

  render() {
    const { task, completeTask, deleteTask, enabled, close, dateFormat } = this.props;
    if (!enabled) return null;

    const completed = task.completed ? 'success-color' : 'failure-color';
    const uncompleted = !task.completed ? 'success-color' : 'failure-color';
    return (
      <Modal isOpen={enabled} onRequestClose={close}>
        <EditTask
          isOpen={this.state.isEditOpen}
          onRequestClose={this.toggleEdit}
          task={task}
        />
        <div className="task-details flex">
          <div className="task-details-title"><i>{task.title}</i></div>
          {task.description ?
            <div className="task-details-description">
              <i>Description:</i><br />
              <div>{task.description}</div>
            </div> : null
          }
          <div><i>Category:</i> <span style={{ color: task.category.color }}>{task.category.name}</span></div>
          <div><i>Date:</i> {task.date.format(dateFormat)}</div>
          <div><i>Start time:</i> {task.startTime ? getTime(task.startTime) : '-'}</div>
          <div><i>End time:</i> {task.endTime ? getTime(task.endTime) : '-'}</div>
          <div className={completed}><b>{`${task.completed ? 'C' : 'Not c'}ompleted`}</b></div>
          <div className="task-details-controls">
            <div
              className={`button ${uncompleted}`}
              onClick={() => completeTask(task._id, task.completed)}
            >
              {`${!task.completed ? 'C' : 'Unc'}omplete`}
            </div>
            <div className="edit-color" onClick={this.toggleEdit}>Edit</div>
            <div className="failure-color" onClick={() => deleteTask(task._id)}>Remove</div>
            <div onClick={close}>Close</div>
          </div>
        </div>
      </Modal>
    );
  }
}