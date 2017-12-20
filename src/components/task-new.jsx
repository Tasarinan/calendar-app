import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
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
      category: this.props.categories[0]._id,
    };

    this.createTask = this.createTask.bind(this);
    this.changeDefaultDate = this.changeDefaultDate.bind(this);
  }

  changeDefaultDate(props) {
    const date = moment();
    if (props.date) {
      date.year(props.date.year);
      date.month(props.date.month-1);
      date.date(props.date.day);
    }
    this.setState({ date });
  }

  componentWillReceiveProps(nextProps) {
    this.changeDefaultDate(nextProps);
  }

  createTask() {
    if (!this.title.value) return;
    const task = {
      ...this.state,
      completed: false,
      date: this.state.date.toDate(),
      title: this.title.value,
      description: this.description.value,
    };
    this.props.createTask(task);
    this.props.onRequestClose();
    this.setState({
      startTime: null,
      endTime: null,
      category: this.props.categories[0]._id,
    });
  }

  renderCategories() {
    const onChange = (e) => this.setState({
      category: e.target.options[e.target.selectedIndex].value
    });
    return (
      <select onChange={onChange} name="category">
        {this.props.categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
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
          <div className="new-task-title">
            <span>Title:</span>
            <input
              ref={(r) => { this.title = r; } }
              type="text"
              placeholder="Title"
              maxLength={100}
              name="title"
              required
            />
          </div>
          <div className="new-task-description">
            <span>Description:</span>
            <textarea
              ref={(r) => { this.description = r; } }
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div className="new-task-category">
            <span>Category:</span> {this.renderCategories()}
            <div><img src={require('../styles/add.png')} alt="Add category"/></div>
          </div>
          <div className="new-task-date">
            <span>Date:</span>
            <DatePicker
              name="date"
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