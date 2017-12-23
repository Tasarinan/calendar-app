import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/appActions';
import Modal from './modal';
import { orderOptions } from "../util/constants";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.settings;

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.changeTaskOrder = this.changeTaskOrder.bind(this);
    this.changeShowWeeks = this.changeShowWeeks.bind(this);
    this.loadDefaults = this.loadDefaults.bind(this);
  }

  save() {
    this.props.saveSettings(this.state);
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

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);