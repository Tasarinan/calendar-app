import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './modal';
import TimePicker from './timepicker';
import Img from './image';

class TaskModal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      date: moment(),
      startTime: null,
      endTime: null,
      category: this.props.categories[0]._id,
    };

    this.createTask = this.createTask.bind(this);
  }

  componentWillReceiveProps(props) {
    let state = { date: props.date || moment() };
    if (props.task) {
      state = {
        date: props.task.date,
        startTime: props.task.startTime,
        endTime: props.task.endTime,
        category: props.task.category._id,
      };
    }
    this.setState(state);
  }

  createTask() {
    if (!this.title.value) return;
    const task = {
      ...this.state,
      completed: false,
      title: this.title.value,
      description: this.description.value,
    };
    const id = this.props.task ? this.props.task._id : null;
    const rev = this.props.task ? this.props.task._rev : null;
    this.props.putTask(task, id, rev);
    this.props.onRequestClose();
    this.setState({
      startTime: null,
      endTime: null,
      category: this.props.categories[0]._id,
    });
  }

  renderCategories(cat) {
    const onChange = (e) => this.setState({
      category: e.target.options[e.target.selectedIndex].value
    });
    const defaultValue = cat ? cat._id : 'default_category';
    return (
      <select
        onChange={onChange}
        name="category"
        defaultValue={defaultValue}
      >
        {this.props.categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
      </select>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    const task = this.props.task || {};
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <form className="new-task-form">
          <div className="new-task-title">
            <span>Title:</span>
            <input
              ref={(r) => { this.title = r; } }
              type="text"
              placeholder="Title"
              maxLength={100}
              name="title"
              defaultValue={task.title || ''}
              required
            />
          </div>
          <div className="new-task-description">
            <span>Description:</span>
            <textarea
              ref={(r) => { this.description = r; } }
              placeholder="Description"
              name="description"
              defaultValue={task.description || ''}
            ></textarea>
          </div>
          <div className="new-task-category">
            <span>Category:</span> {this.renderCategories(task.category)}
            <div><Img src="add.png" alt="Add category"/></div>
          </div>
          <div className="new-task-date">
            <span>Date:</span>
            <DatePicker
              name="date"
              selected={task.date || this.state.date}
              onChange={(date) => this.setState({ date })}
            />
          </div>
          <div>
            <span>Start time:</span>
            <TimePicker
              onChange={(time) => this.setState({startTime: time})}
              initialState={task.startTime}
              noInitialization={!task.startTime}
            />
          </div>
          <div>
            <span>End time:</span>
            <TimePicker
              onChange={(time) => this.setState({endTime: time})}
              initialState={task.endTime}
              noInitialization={!task.endTime}
            />
          </div>
          <div className="new-task-controls">
            <div className="success-color" onClick={this.createTask}>Save</div>
            <div className="failure-color" onClick={onRequestClose}>Cancel</div>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.tasks.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);