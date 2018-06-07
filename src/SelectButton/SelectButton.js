import React, { Component } from 'react';
import './SelectButton.css';

class SelectButton extends Component {
  render() {
    return (
      <button onClick={() => this.props.onSelect(this.props.id) } className={"select-button " + (this.props.selected ? "select-button--selected" : "")}>
        <span className="select-button__label">{this.props.value}</span>
      </button>
    );
  }
}

export default SelectButton;
