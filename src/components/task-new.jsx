import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './modal';
import TimePicker from './timepicker';

class TaskModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      date: moment(),
      startTime: null,
      endTime: null,
    };
  }

  renderCategories() {
    return (
      <select>
        {/*this.props.categories*/[].map(c => <option value={c}>c</option>)}
      </select>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <form className="new-task-form">
          <div className="new-task-title"><span>Title:</span><input type="text" placeholder="Title" maxLength={140}/></div>
          <div className="new-task-description"><span>Description:</span> <textarea placeholder="Description"></textarea></div>
          <div className="new-task-category">
            <span>Category:</span> {this.renderCategories()}
            <div><img src={require('../styles/add.png')} alt="Add category"/></div>
          </div>
          <div className="new-task-date">
            <span>Date:</span>
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setState({ date })}
            />
          </div>
          <div>
            <span>Start time:</span>
            <TimePicker
              onChange={(time) => this.setState({startTime: time})}
              noInitialization
            />
          </div>
          <div>
            <span>End time:</span>
            <TimePicker
              onChange={(time) => this.setState({endTime: time})}
              noInitialization
            />
          </div>
          <div className="new-task-controls">
            <div className="success-color">Save</div>
            <div className="failure-color">Cancel</div>
          </div>
        </form>
      </Modal>
    );
  }
}

export default TaskModal;