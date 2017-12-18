import React from 'react';
import Modal from './modal';
import { getTime } from '../util/date';

export default ({ task, completeTask, deleteTask, enabled, close }) => {
  if (!task.id) return null;
  const completed = task.completed ? 'success-color' : 'failure-color';
  const uncompleted = !task.completed ? 'success-color' : 'failure-color';
  return (
    <Modal
      isOpen={enabled}
      onRequestClose={close}
    >
      <div className="task-details flex">
        <div style={{ textAlign: 'center' }}><i>{task.title}</i></div>
        {task.description ?
          <div>
            <i>Description:</i><br />
            <div
              style={{
                maxHeight: '35vh',
                overflowY: 'auto'
              }}>
              {task.description}
            </div>
          </div> :
          null
        }
        <div><i>Category:</i> <span style={{ color: task.bubbleColor }}>{task.category}</span></div>
        <div><i>Date:</i> {task.date.toDateString()}</div>
        <div><i>Start time:</i> {task.startTime ? getTime(task.startTime) : '-'}</div>
        <div><i>End time:</i> {task.endTime ? getTime(task.endTime) : '-'}</div>
        <div className={completed}><b>{`${task.completed ? 'C' : 'Not c'}ompleted`}</b></div>
        <div className="task-details-controls">
          <div
            className={`button ${uncompleted}`}
            onClick={() => completeTask(task.id, task.completed)}
          >
            {`${!task.completed ? 'C' : 'Unc'}omplete`}
          </div>
          <div style={{color: '#eae85c'}}>Edit</div>
          <div className="failure-color" onClick={() => deleteTask(task.id)}>Remove</div>
          <div onClick={close}>Close</div>
        </div>
      </div>
    </Modal>
  );
}