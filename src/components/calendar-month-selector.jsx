import React from 'react';
import PropTypes from 'prop-types';

class Selector extends React.Component {
  render() {
    const {month, year, changeMonth} = this.props;
    return (
      <div className="month-selector">
        <img
          src={require('../styles/arrow-l.png')}
          alt="Back"
          onClick={() => changeMonth(false)}
        />
        <div>{`${month} ${year}`}</div>
        <img
          src={require('../styles/arrow-r.png')}
          alt="Forward"
          onClick={() => changeMonth(true)}
        />
      </div>
    );
  }
}

Selector.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  changeMonth: PropTypes.func,
};

export default Selector;