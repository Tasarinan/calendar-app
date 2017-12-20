import React from 'react';
import Modal from 'react-modal';

export default (props) => {
  Modal.setAppElement('#root');
  return (
    <Modal {...props}>
      <div className="modal-content">
        {props.children}
      </div>
    </Modal>
  );
}