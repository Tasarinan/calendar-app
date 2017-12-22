import React from 'react';
import { connect } from 'react-redux';
import Tasks from './sidepanel-tasks';
import NewTask from './task-new';
import Settings from './settings';
import Img from './image';

class Sidepanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isNewTaskOpen: false,
      isSettingsOpen: false,
    };

    this.toggleNewTask = this.toggleNewTask.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  toggleNewTask() {
    this.setState({
      isNewTaskOpen: !this.state.isNewTaskOpen
    })
  }

  toggleSettings() {
    this.setState({
      isSettingsOpen: !this.state.isSettingsOpen
    })
  }

  render() {
    const {date} = this.props;
    return (
      <div className="sidepanel">
        <NewTask
          isOpen={this.state.isNewTaskOpen}
          onRequestClose={this.toggleNewTask}
          date={date}
        />
        <Settings
          isOpen={this.state.isSettingsOpen}
          onRequestClose={this.toggleSettings}
        />
        <div className="sidepanel-info">
          <div>{date.format('dddd')}</div>
          <div>{date.format(this.props.dateFormat)}</div>
        </div>
        <Tasks date={date}/>
        <div className="sidepanel-controls">
          <Img
            src="settings.ico"
            alt="Settings"
            onClick={this.toggleSettings}
          />
          <Img
            src="add.png"
            alt="New task"
            onClick={this.toggleNewTask}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.calendar.focusedDate,
  dateFormat: state.app.settings.sidepanelDateFormat,
});

export default connect(mapStateToProps)(Sidepanel);