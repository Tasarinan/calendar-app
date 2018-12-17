import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, MenuItem } from '@material-ui/core';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.noInitialization ? {} : props.initialState;
  }

  onChange = (e, hours) => {
    const val = e.target.value;
    const value = parseInt(val, 10);
    const state = hours ?
      {
        hours: value,
        minutes: value === -1 ? -1 : this.state.minutes || 0,
      } :
      {
        hours: value === -1 ? -1 : this.state.hours || 0,
        minutes: value,
      };
    this.props.onChange({...state});
    this.setState(state);
  }

  getHours() {
    const hours = [<MenuItem value={-1} key={'-'}>-</MenuItem>];
    for (let i = 0; i < 24; i ++) {
      hours.push(
        <MenuItem value={i} key={i}>
          {i < 10 ? '0' + i : i}
        </MenuItem>);
    }
    return hours;
  }

  getMinutes() {
    const minutes = [<MenuItem value={-1} key={'-'}>-</MenuItem>];
    for (let i = 0; i < 60; i += 5) {
      minutes.push(
        <MenuItem value={i} key={i}>
          {i < 10 ? '0' + i : i}
        </MenuItem>);
    }
    return minutes;
  }

  render() {
    return (
      <div>
        <Select
          onChange={(e) => this.onChange(e, true)}
          value={this.state.hours === undefined ? -1 : this.state.hours}
        >
          {this.getHours()}
        </Select>
        &nbsp;:&nbsp;
        <Select
          onChange={(e) => this.onChange(e, false)}
          value={this.state.minutes === undefined ? -1 : this.state.minutes}
        >
          {this.getMinutes()}
        </Select>
      </div>
    );
  }
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number
  }),
  noInitialization: PropTypes.bool,
}

TimePicker.defaultProps = {
  onChange: () => null,
  initialState: {
    hours: moment().hour(),
    minutes: moment().minute(),
  },
  noInitialization: false,
}

export default TimePicker;