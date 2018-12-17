import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Input, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
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
      category: 'default_category',
      fromGoogle: false,
      editCategory: false,
    };
  }

  componentWillReceiveProps(props) {
    let state = { date: props.date || moment() };
    if (props.task) {
      state = {
        date: props.task.date,
        startTime: props.task.startTime,
        endTime: props.task.endTime,
        category: props.task.category._id,
        fromGoogle: props.task.fromGoogle,
      };
    }
    this.setState(state);
  }

  createTask = () => {
    if (!this.title.value) return;

    const task = {
      ...this.state,
      completed: false,
      title: this.title.value,
      description: this.description.value,
    };
    delete task.editCategory;

    if (this.state.editCategory) {
      task.category = {
        _id: new Date().toISOString(),
        name: this.category.value,
        color: this.color.value,
      };
    }

    const id = this.props.task ? this.props.task._id : null;
    const rev = this.props.task ? this.props.task._rev : null;
    this.props.putTask(task, id, rev);
    this.props.onRequestClose();
    
    this.setState({
      startTime: null,
      endTime: null,
      category: 'default_category',
      fromGoogle: true,
      editCategory: false,
    });
  }

  renderCategories = (cat) => {
    const onChange = e => this.setState({
      category: e.target.value
    });
    const defaultValue = cat ? cat._id : this.state.category;
    return (
      <Select
        onChange={onChange}
        name="category"
        value={defaultValue}
        input={<Input id="category-input" style={{flexGrow:1}} />}
      >
        {this.props.categories.map(c => <MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>)}
      </Select>
    );
  }

  toggleCategoryEdit = () => {
    this.setState({
      editCategory: !this.state.editCategory
    });
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    const task = this.props.task || {};
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <form className="new-task-form">
          <div className="new-task-title">
            <Input
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
            <Input
              ref={(r) => { this.description = r; } }
              placeholder="Description"
              name="description"
              defaultValue={task.description || ''}
              rows={7}
              multiline
            />
          </div>
          <div className="new-task-category">
            {this.state.editCategory ?
              <div className="new-task-new-category">
                <Input type="text" ref={r => { this.category = r; }} required/>
                <Input type="color" ref={r => { this.color = r; }}/>
              </div> :
              <div>
                <InputLabel>Category:</InputLabel>
                {this.renderCategories(task.category)}
              </div>
            }
            <Img src={this.state.editCategory ? 'subtract.png' : 'add.png'} alt="Add category" onClick={this.toggleCategoryEdit}/>
          </div>
          <div className="new-task-date">
            <InputLabel>Date:</InputLabel>
            <DatePicker
              name="date"
              selected={this.state.date}
              onChange={(date) => this.setState({ date })}
              customInput={<Input />}
            />
          </div>
          <div>
            <InputLabel>Start time:</InputLabel>
            <TimePicker
              onChange={(time) => this.setState({startTime: time})}
              initialState={task.startTime}
              noInitialization={!task.startTime}
            />
          </div>
          <div>
            <InputLabel>End time:</InputLabel>
            <TimePicker
              onChange={(time) => this.setState({endTime: time})}
              initialState={task.endTime}
              noInitialization={!task.endTime}
            />
          </div>
          {this.props.loggedIn && ((this.props.task && !this.props.task.fromGoogle) || !this.props.task) ?
            <div>
              <span>Save in google calendar:</span>
              <div><input
                type="checkbox"
                checked={this.state.fromGoogle}
                onChange={(e) => this.setState({ fromGoogle: e.target.checked})}
              /></div>
            </div>
            : null
          }
          <div className="new-task-controls">
            <Button className="failure-color" onClick={onRequestClose}>Cancel</Button>
            <Button className="success-color" onClick={this.createTask}>Save</Button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.tasks.categories,
  loggedIn: state.app.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);