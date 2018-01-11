import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.changeTaskOrder = this.changeTaskOrder.bind(this);
    this.changeShowWeeks = this.changeShowWeeks.bind(this);
    this.changeTaskAutoDelete = this.changeTaskAutoDelete.bind(this);
    this.changeWeekStart = this.changeWeekStart.bind(this);
    this.loadDefaults = this.loadDefaults.bind(this);
    this.editCategories = this.editCategories.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  save() {
    const settings = {
      ...this.state,
      weekStart: parseInt(this.state.weekStart, 10)
    };
    delete settings.isEditCatOpen;
    this.props.saveSettings(settings);
    this.props.onRequestClose();
  }

  cancel() {
    this.setState(this.props.settings);
    this.props.onRequestClose();
  }

  loadDefaults() {
    this.setState(this.props.defaultSettings);
  }

  changeTaskOrder(e) {
    const val = e.target.options[e.target.selectedIndex].value;
    this.setState({ taskOrder: val });
  }

  changeShowWeeks(e) {
    const val = e.target.checked;
    this.setState({ showWeeks: val });
  }

  changeTaskAutoDelete(e, isCount) {
    const value = isCount ?
      e.target.value :
      e.target.options[e.target.selectedIndex].value;

    this.setState({
      deleteTasksAfter: {
        count: isCount ? value : this.state.deleteTasksAfter.count,
        name: !isCount ? value : this.state.deleteTasksAfter.name,
      }
    })
  }

  changeWeekStart(e) {
    const value = e.target.options[e.target.selectedIndex].value;
    this.setState({ weekStart: value });
  }

  editCategories() {
    this.setState({
      isEditCatOpen: !this.state.isEditCatOpen
    });
  }

  renderCategories() {
    return this
      .props
      .categories
      .map(c => <option value={c._id} key={c._id}>{c.name}</option>);
  }

  changeCategory(e) {
    const id = e.target.options[e.target.selectedIndex].value;
    this.setState({
      taskCountCategory: id,
    });
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditCategories isOpen={this.state.isEditCatOpen} onRequestClose={this.editCategories} />
        <div className="settings">
          <div className="settings-title">Settings</div>
          <div className="settings-items">
            <div>
              <span>Order tasks by:</span>
              <select value={this.state.taskOrder} onChange={this.changeTaskOrder}>
                {Object
                  .values(orderOptions)
                  .map(p => <option value={p} key={p}>{p}</option>)
                }
              </select>
            </div>
            <div>
              <span>Week starts on:</span>
              <select value={this.state.weekStart} onChange={this.changeWeekStart}>
                <option value={1}>Monday</option>
                <option value={0}>Sunday</option>
              </select>
            </div>
            <div>
              <span>Show week numbers:</span>
              <input
                type="checkbox"
                checked={this.state.showWeeks}
                onChange={this.changeShowWeeks}
              />
            </div>
            {
              this.state.showWeeks ?
              <div>
                <span>Start week numbering from:</span>
                <input
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
                <input
                  type="checkbox"
                  checked={this.state.showWeekTaskCount}
                  onChange={(e) => this.setState({ showWeekTaskCount: e.target.checked})}
                />
              </div> : null
            }
            <div>
              <span>Show days task count:</span>
              <input
                type="checkbox"
                checked={this.state.showTaskCount}
                onChange={(e) => this.setState({ showTaskCount: e.target.checked})}
              />
            </div>
            <div>
              <span>Count completed tasks:</span>
                <input
                  type="checkbox"
                  checked={this.state.countCompletedTasks}
                  onChange={(e) => this.setState({ countCompletedTasks: e.target.checked})}
                />
            </div>
            <div>
              <span>Couont tasks with category:</span>
              <select onChange={this.changeCategory} value={this.state.taskCountCategory}>
                <option value="*">All</option>
                {this.renderCategories()}
              </select>
            </div>
            <div>
              <span>Delete old tasks:</span>
              <input
                type="checkbox"
                checked={this.state.deleteOldTasks}
                onChange={() => this.setState({deleteOldTasks: !this.state.deleteOldTasks})}
              />
            </div>
            {
              this.state.deleteOldTasks ?
              <div>
                <span>Delete tasks after:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={this.state.deleteTasksAfter.count}
                  onChange={(e) => this.changeTaskAutoDelete(e, true)}
                />&nbsp;
                <select
                  value={this.state.deleteTasksAfter.name}
                  onChange={(e) => this.changeTaskAutoDelete(e, false)}
                >
                  <option value='day'>Days</option>
                  <option value='month'>Months</option>
                  <option value='year'>Years</option>
                </select>
              </div> : null
            }
            <div>
              <button onClick={this.editCategories}>Edit categories</button>
            </div>
            <div>
              <Login
                logout={this.props.loggedIn}
                action={this.props.loggedIn ? this.props.logout : this.props.login}
                email={this.props.user ? this.props.user.email : null}
              />
            </div>
          </div>
          <div className="settings-controls">
            <div className="success-color" onClick={this.save}>Save</div>
            <div className="edit-color" onClick={this.loadDefaults}>Load defaults</div>
            <div className="failure-color" onClick={this.cancel}>Cancel</div>
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
  user: state.app.user
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);