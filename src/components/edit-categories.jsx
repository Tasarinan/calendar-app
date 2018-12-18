import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Select, MenuItem, Button, InputLabel } from '@material-ui/core';
import * as actionCreators from '../redux/actions/taskActions';
import Modal from './modal';

class EditCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.categories[0] };
  }

  save = () => {
    this.props.updateCategory({ ...this.state });
    this.props.onRequestClose();
  }

  changeSelected = (e) => {
    const id = e.target.value;
    const cat = this.props.categories.find(c => c._id === id) || this.props.categories[0];
    this.setState(cat);
  }

  renderCategories = () => {
    const defaultValue = this.state._id || 'default_category';
    return (
      <Select
        onChange={this.changeSelected}
        value={defaultValue}
      >
        {this.props.categories.map(c => <MenuItem value={c._id} key={c._id}>{c.name}</MenuItem>)}
      </Select>
    );
  }

  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="small-modal"
      >
        <div className="modal-title">Edit category</div>
        <div className="edit-categories">
          <div>
            <InputLabel>Edit category:</InputLabel>
            {this.renderCategories(this.state._id)}
          </div>
          <div>
            <InputLabel>Color: </InputLabel>
            <Input
              type="color"
              value={this.state.color}
              onChange={(e) => this.setState({ color: e.target.value })}
            />
          </div>
          <div>
            <InputLabel>Name:</InputLabel>
            <Input
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="categories-controls">
            <Button onClick={onRequestClose} className="failure-color">Cancel</Button>
            <Button onClick={this.save} className="success-color">Save</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.tasks.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditCat);