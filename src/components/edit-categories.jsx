import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/taskActions';
import Modal from './modal';

class EditCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.categories[0] };
    this.renderCategories = this.renderCategories.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    this.props.updateCategory({ ...this.state });
    this.props.onRequestClose();
  }

  changeSelected(e) {
    const id = e.target.options[e.target.selectedIndex].value;
    const cat = this.props.categories.find(c => c._id === id) || this.props.categories[0];
    this.setState(cat);
  }

  renderCategories(cat) {
    const defaultValue = cat ? cat._id : 'default_category';
    return (
      <select
        onChange={this.changeSelected}
        name="category"
        defaultValue={defaultValue}
      >
        {this.props.categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
      </select>
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
        <div className="edit-categories">
          <span>Edit category:</span>
          {this.renderCategories(this.state._id)}
          <div>
            <span>Color: </span>
            <input
              type="color"
              value={this.state.color}
              onChange={(e) => this.setState({ color: e.target.value })}
            />
          </div>
          <div>
            <span>Name: </span>
            <input
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="categories-controls">
            <div onClick={this.save} className="success-color">Save</div>
            <div onClick={onRequestClose} className="failure-color">Cancel</div>
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