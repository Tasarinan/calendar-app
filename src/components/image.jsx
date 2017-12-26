import React from 'react';
import PropTypes from 'prop-types';

const Image = props => {
  const src = props.notAsset ? props.src : 'styles/images/' + props.src;
  return (
    <img alt={props.alt} src={require('../' + src)} onClick={props.onClick}/>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  notAsset: PropTypes.bool,
  onClick: PropTypes.func,
}

Image.defaultProps = {
  notAsset: false,
  onClick: () => null,
}

export default Image;