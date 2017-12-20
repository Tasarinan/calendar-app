import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.noInitialization ? {} : props.initialState;

    this.onChange = this.onChange.bind(this);
  }

  onChange(e, hours) {
    const value = parseInt(e.target.options[e.target.selectedIndex].value, 10);
    const state = hours ?
      {
        hours: value,
        minutes: this.state.minutes || 0,
      } :
      {
        hours: this.state.hours || 0,
        minutes: value,
      };
    this.props.onChange({...state});
    this.setState(state);
  }

  render() {
    const hours = [<option value={-1} key={'-'}>-</option>];
    const minutes = [<option value={-1} key={'-'}>-</option>];
    for (let i = 0; i < 59; i ++) {
      if (i < 24) {
        hours.push(
          <option value={i} key={i}>
            {i < 10 ? '0' + i : i}
          </option>);
      }
      minutes.push(
        <option value={i} key={i}>
          {i < 10 ? '0' + i : i}
        </option>);
    }

    return (
      <div>
        <select
          onChange={(e) => this.onChange(e, true)}
          value={this.state.hours === undefined ? -1 : this.state.hours}
        >
          {hours}
        </select>
        :
        <select
          onChange={(e) => this.onChange(e, false)}
          value={this.state.minutes === undefined ? -1 : this.state.minutes}
        >
          {minutes}
        </select>
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