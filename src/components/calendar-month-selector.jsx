import React from 'react';
import PropTypes from 'prop-types';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import ForwardArrow from '@material-ui/icons/ArrowForwardIos';

class Selector extends React.Component {
  render() {
    const {month, year, changeMonth} = this.props;
    return (
      <div className="month-selector">
        <BackArrow onClick={() => changeMonth(false)} />
        <div>{`${month} ${year}`}</div>
        <ForwardArrow onClick={() => changeMonth(true)} />
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