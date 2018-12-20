import React from 'react';
import { connect } from 'react-redux';
import AddCircle from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import Tasks from './sidepanel-tasks';
import NewTask from './task-new';
import Settings from './settings';

class Sidepanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isNewTaskOpen: false,
      isSettingsOpen: false,
    };
  }

  toggleNewTask = () => {
    this.setState({
      isNewTaskOpen: !this.state.isNewTaskOpen
    })
  }

  toggleSettings = () => {
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
          <SettingsIcon onClick={this.toggleSettings} />
          <AddCircle onClick={this.toggleNewTask} />
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