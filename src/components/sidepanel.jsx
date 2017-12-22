import React from 'react';
import { connect } from 'react-redux';
import Tasks from './sidepanel-tasks';
import NewTask from './task-new';
import Img from './image';

class Sidepanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = { isModalOpen: false };

    this.toggleNewTaskModal = this.toggleNewTaskModal.bind(this);
  }

  toggleNewTaskModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const {date} = this.props;
    return (
      <div className="sidepanel">
        <NewTask
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleNewTaskModal}
          date={date}
        />
        <div className="sidepanel-info">
          <div>{date.format('dddd')}</div>
          <div>{date.format(this.props.dateFormat)}</div>
        </div>
        <Tasks date={date}/>
        <div className="sidepanel-controls">
          <Img src="settings.ico" alt="Settings"/>
          <Img
            src="add.png"
            alt="New task"
            onClick={this.toggleNewTaskModal}
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