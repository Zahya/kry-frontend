import React, { Component } from 'react';
import './ActionButton.css';

class ActionButton extends Component {
  render() {
    return (
      <button disabled={this.props.disable} onClick={this.props.onAction} className={"action-button " + (this.props.active ? "action-button--active" : "")}>
        <span className="action-button__label">{this.props.label}</span>
        <img src={this.props.active ? "images/arrow-right-white.svg" : "images/arrow-right.svg"} className="icon__arrow-right" alt={this.props.label} />
      </button>
    );
  }
}

export default ActionButton;
