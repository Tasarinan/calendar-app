import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Select, MenuItem, Button, Switch } from '@material-ui/core';
import * as actionCreators from '../redux/actions/appActions';
import Modal from './modal';
import EditCategories from './edit-categories';
import Login from './login';
import { orderOptions } from "../util/constants";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.settings,
      isEditCatOpen: false,
    };
  }

  save = () => {
    const settings = {
      ...this.state,
      weekStart: parseInt(this.state.weekStart, 10)
    };
    delete settings.isEditCatOpen;
    this.props.saveSettings(settings);
    this.props.onRequestClose();
  }

  cancel = () => {
    this.setState(this.props.settings);
    this.props.onRequestClose();
  }

  loadDefaults = () => {
    this.setState(this.props.defaultSettings);
  }

  changeTaskOrder = (e) => {
    const val = e.target.value;
    this.setState({ taskOrder: val });
  }

  changeShowWeeks = (e) => {
    const val = e.target.checked;
    this.setState({ showWeeks: val });
  }

  changeTaskAutoDelete = (e, isCount) => {
    const value = e.target.value;

    this.setState({
      deleteTasksAfter: {
        count: isCount ? value : this.state.deleteTasksAfter.count,
        name: !isCount ? value : this.state.deleteTasksAfter.name,
      }
    })
  }

  changeWeekStart = (e) => {
    const value = e.target.value;
    this.setState({ weekStart: value });
  }

  editCategories = () => {
    this.setState({
      isEditCatOpen: !this.state.isEditCatOpen
    });
  }

  renderCategories = () => {
    return this
      .props
      .categories
      .map(c => <MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>);
  }

  renderCalendars = () => {
    if (this.props.calendars === null || this.props.calendars.length === 0) {
      if (this.props.calendars === null) {
        this.props.loadCalendars();
      }
      return <MenuItem value="primary" key="primary">Primary</MenuItem>;
    }
    return this
      .props
      .calendars
      .map(c => <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>);
  }

  changeCategory = (e) => {
    const id = e.target.value;
    this.setState({ taskCountCategory: id });
  }

  changeCalendar = (e) => {
    const id = e.target.value;
    this.setState({ selectedCalendar: id });
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditCategories isOpen={this.state.isEditCatOpen} onRequestClose={this.editCategories} />
        <div className="settings">
          <div className="modal-title">Settings</div>
          <div className="settings-items">
            <div>
              <span>Order tasks by:</span>
              <Select value={this.state.taskOrder} onChange={this.changeTaskOrder}>
                {Object
                  .values(orderOptions)
                  .map(p => <MenuItem value={p} key={p}>{p}</MenuItem>)
                }
              </Select>
            </div>
            <div>
              <span>Week starts on:</span>
              <Select value={this.state.weekStart} onChange={this.changeWeekStart}>
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={0}>Sunday</MenuItem>
              </Select>
            </div>
            <div>
              <span>Show week numbers:</span>
              <Switch
                checked={this.state.showWeeks}
                onChange={this.changeShowWeeks}
                color="primary"
              />
            </div>
            {
              this.state.showWeeks ?
              <div>
                <span>Start week numbering from:</span>
                <Input
                  type="number"
                  min={1}
                  max={52}
                  value={this.state.weekNumberStart}
                  onChange={(e) => this.setState({ weekNumberStart: e.target.value})}
                />
              </div> : null
            }
            {
              this.state.showWeeks ?
              <div>
                <span>Show weeks task count:</span>
                <Switch
                  checked={this.state.showWeekTaskCount}
                  onChange={(e) => this.setState({ showWeekTaskCount: e.target.checked})}
                  color="primary"
                />
              </div> : null
            }
            <div>
              <span>Show days task count:</span>
              <Switch
                checked={this.state.showTaskCount}
                onChange={(e) => this.setState({ showTaskCount: e.target.checked})}
                color="primary"
              />
            </div>
            <div>
              <span>Count completed tasks:</span>
                <Switch
                  checked={this.state.countCompletedTasks}
                  onChange={(e) => this.setState({ countCompletedTasks: e.target.checked})}
                  color="primary"
                />
            </div>
            <div>
              <span>Count tasks with category:</span>
              <Select onChange={this.changeCategory} value={this.state.taskCountCategory}>
                <MenuItem value="*">All</MenuItem>
                {this.renderCategories()}
              </Select>
            </div>
            <div>
              <span>Delete old tasks:</span>
              <Switch
                checked={this.state.deleteOldTasks}
                onChange={() => this.setState({deleteOldTasks: !this.state.deleteOldTasks})}
                color="primary"
              />
            </div>
            {
              this.state.deleteOldTasks ?
              <div>
                <span>Delete tasks after:</span>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={this.state.deleteTasksAfter.count}
                  onChange={(e) => this.changeTaskAutoDelete(e, true)}
                />&nbsp;
                <Select
                  value={this.state.deleteTasksAfter.name}
                  onChange={(e) => this.changeTaskAutoDelete(e, false)}
                >
                  <MenuItem value='day'>Days</MenuItem>
                  <MenuItem value='month'>Months</MenuItem>
                  <MenuItem value='year'>Years</MenuItem>
                </Select>
              </div> : null
            }
            <div>
              <Button onClick={this.editCategories} variant="contained" className="button-padding">Edit categories</Button>
            </div>
            <div>
              <Login
                logout={this.props.loggedIn}
                action={this.props.loggedIn ? this.props.logout : this.props.login}
                onError={this.props.showError}
                email={this.props.user ? this.props.user.email : null}
              />
            </div>
            {this.props.loggedIn ?
              <div>
                <span>Calendar to use:</span>
                <Select onChange={this.changeCalendar} value={this.state.selectedCalendar}>
                  {this.renderCalendars()}
                </Select>
              </div>
              : null
            }
          </div>
          <div className="settings-controls">
            <Button className="failure-color" onClick={this.cancel}>Cancel</Button>
            <Button className="edit-color" onClick={this.loadDefaults}>Load defaults</Button>
            <Button className="success-color" onClick={this.save}>Save</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.app.settings,
  defaultSettings: state.app.defaultSettings,
  categories: state.tasks.categories,
  loggedIn: state.app.loggedIn,
  calendars: state.app.calendars,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);