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
          <div>Title: <input type="text" placeholder="Title" maxLength={140}/></div>
          <div><div>Description:</div> <textarea placeholder="Description"></textarea></div>
          <div className="new-task-category">
            Category: {this.renderCategories()}
            <span>+</span>
          </div>
          <div>
            Date:
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setState({ date })}
            />
          </div>
          <div>
            Start time:
            <TimePicker
              onChange={(time) => this.setState({startTime: time})}
              noInitialization
            />
          </div>
          <div>
            End time:
            <TimePicker
              onChange={(time) => this.setState({endTime: time})}
              noInitialization
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default TaskModal;