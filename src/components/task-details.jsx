import React from 'react';
import Markdown from 'react-markdown';
import { Button } from '@material-ui/core';
import Modal from './modal';
import { getTime } from '../util/date';
import EditTask from './task-new';
import ScrollBar from 'react-custom-scrollbars';

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false
    };
  }

  toggleEdit = () => {
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
        <div className="modal-title">Task details</div>
        <div className="task-details flex">
          <div className="task-details-title"><i>{task.title}</i></div>
          {task.description ?
            <div className="task-details-description">
              <i>Description:</i><br />
              <div>
                <ScrollBar style={{height: '35vh'}}>
                  <Markdown source={task.description}/>
                </ScrollBar>
              </div>
            </div> : null
          }
          <div><i>Category:</i> <span style={{ color: task.category.color }}>{task.category.name}</span></div>
          <div><i>Date:</i> {task.date.format(dateFormat)}</div>
          <div><i>Start time:</i> {task.startTime ? getTime(task.startTime) : '-'}</div>
          <div><i>End time:</i> {task.endTime ? getTime(task.endTime) : '-'}</div>
          <div className={completed}><b>{task.completed ? 'Completed' : 'Not completed'}</b></div>
          <div className="task-details-controls">
            <Button onClick={close}>Close</Button>
            <Button className="failure-color" onClick={() => deleteTask(task._id)}>Remove</Button>
            <Button className="edit-color" onClick={this.toggleEdit}>Edit</Button>
            <Button
              className={`button ${uncompleted}`}
              onClick={() => completeTask(task._id, task.completed)}
            >
              {!task.completed ? 'Complete' : 'Uncomplete'}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}