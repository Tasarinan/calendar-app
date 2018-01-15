import React from 'react';
import '../styles/Anim.css';

class ErrorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fade: false, hidden: false };
    setTimeout(this.hide, props.closeAfter * 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    return nextProps.hidden !== this.props.hidden
      || nextProps.message !== this.props.message;
  }

  componentDidUpdate() {
    setTimeout(this.hide, this.props.closeAfter * 1000);
  }

  componentWillReceiveProps(props) {
    this.setState({
      fade: false,
      hidden: false,
    });
  }

  hide = () => {
    if (this.state.fade) {
      return;
    }
    this.element.addEventListener(
      'animationend',
      () => {
        this.setState({ hidden: true });
        this.props.onFinishHide();
      },
      false
    );
    this.setState({ fade: true });
  }

  render() {
    const hidden = this.props.hidden || this.state.hidden || !this.props.message ? 'hidden' : '';
    const fade = this.state.fade ? 'fade-out' : '';
    return (
      <div
        ref={r => { this.element = r; }}
        className={`error ${hidden} ${fade}`}
        onClick={(e) => {
          this.hide();
          this.props.onClick(e);
        }}
      >
        <div>{this.props.message}</div>
      </div>
    );
  }
}

ErrorPopup.defaultProps = {
  hidden: false,
  message: '',
  onClick: () => null,
  onFinishHide: () => null,
  closeAfter: 2,
};

export default ErrorPopup;