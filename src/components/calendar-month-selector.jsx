import React from 'react';
import PropTypes from 'prop-types';

class Selector extends React.Component {
  render() {
    const {month, year} = this.props;
    return (
      <div className="month-selector">
         <img src={require('../styles/arrow-l.png')} alt="Back"/>
         <div>{`${month} ${year}`}</div>
         <img src={require('../styles/arrow-r.png')} alt="Forward"/>
      </div>
    );
  }
}

Selector.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default Selector;