import React, { Component } from 'react';
import SudokuBoard from '../SudokuBoard/SudokuBoard';

type SudokuCellProps = {
  value: string,
  x: number,
  y: number,
  numbersOnly: boolean,
  handleChange: (i: number, j: number, val: string) => void
};

class SudokuCell extends Component<SudokuCellProps, any> {
  constructor(props: SudokuCellProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.selectCell = this.selectCell.bind(this);
  }

  public render() {
    const pattern = this.props.numbersOnly ? "[0-9]*" : "";
    return <div><input type="text" pattern={pattern} value={this.props.value} onChange={this.handleChange} id={SudokuBoard.generateTDKeyName(this.props.x, this.props.y)} onKeyDown={this.handleKeyPress}></input></div>;
  }
  public handleChange(event: any) {
    this.props.handleChange(this.props.x, this.props.y, event.target.value);
  }
  public handleKeyPress(event: any) {
    const keyCode = event.keyCode;
    if (keyCode === 37) { // left arrow
      this.selectCell(this.props.x, this.props.y - 1);
    }
    else if (keyCode === 38) { // up arrow
      this.selectCell(this.props.x - 1, this.props.y);
    }
    else if (keyCode === 39) { // right arrow
      this.selectCell(this.props.x, this.props.y + 1);
    }
    else if (keyCode === 40) { // down arrow
      this.selectCell(this.props.x + 1, this.props.y);
    }
  }
  public selectCell(i: number, j: number) {
    const cell = document.getElementById(SudokuBoard.generateTDKeyName(i, j));
    if (cell) cell.focus();
    else console.log("Could not find the element (" + i + "," + j + ") to select it")
  }
}

export default SudokuCell;
