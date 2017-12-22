import React from 'react';
import PropTypes from 'prop-types';
import Img from './image';

class Selector extends React.Component {
  render() {
    const {month, year, changeMonth} = this.props;
    return (
      <div className="month-selector">
        <Img
          src="arrow-l.png"
          alt="Back"
          onClick={() => changeMonth(false)}
        />
        <div>{`${month} ${year}`}</div>
        <Img
          src="arrow-r.png"
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