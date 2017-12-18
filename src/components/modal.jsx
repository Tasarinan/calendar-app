import React from 'react';
import Modal from 'react-modal';

export default (props) => {
  Modal.setAppElement('#root');
  return (
    <Modal {...props}>
      <div className="modal-close"><img
        src={require('../styles/close.png')}
        alt="close"
        onClick={props.onRequestClose}
      /></div>
      <div className="modal-content">
        {props.children}
      </div>
    </Modal>
  );
}