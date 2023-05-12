import React, { Component } from 'react';
import SudokuCell from '../SudokuCell/SudokuCell';


type SudokuBoardProps = {
  rows: Array<Array<string>>;
  boardWidth: number,
  numbersOnly: boolean
  handleChange: (i: number, j: number, val: string) => void
};

const CLASS_NAMES = {
  borderLeft: 'borderLeft-custom',
  borderTop: 'borderTop-custom',
  borderRight: 'borderRight-custom',
  borderBottom: 'borderBottom-custom',
}

class SudokuBoard extends Component<SudokuBoardProps, any> {
  public render() {
    const rows = this.props.rows;
    const dynamicRows = rows.map((row, i) => {
      const dynamicRow = row.map((val, j) => {
        return (<td className={this.generateTDClassName(i, j)} key={SudokuBoard.generateTDKeyName(i, j)}><SudokuCell value={val} x={i} y={j} numbersOnly={this.props.numbersOnly} handleChange={this.props.handleChange} ></SudokuCell></td>);
      });
      return (<tr className={this.generateTRClassName(i)} key={'row' + i}>{dynamicRow}</tr>);

    });
    return <div>
      <table className="table-custom">
        <tbody>
          {dynamicRows}
        </tbody>
      </table>
    </div >;
  }

  public static generateTDKeyName(i: number, j: number) {
    return 'cell-' + i + '-' + j
  }
  public generateTDClassName(i: number, j: number) {

    var topOrBottom = '';
    // top border
    if (i === 0) {
      topOrBottom = CLASS_NAMES.borderTop;
    }
    // bottom border
    else if ((i + 1) % this.props.boardWidth === 0) {
      topOrBottom = CLASS_NAMES.borderBottom;
    }
    var leftOrRight = '';
    // left border
    if (j === 0) {
      leftOrRight = CLASS_NAMES.borderLeft;
    }
    // right border
    else if ((j + 1) % this.props.boardWidth === 0) {
      leftOrRight = CLASS_NAMES.borderRight;
    }
    return 'td ' + topOrBottom + ' ' + leftOrRight;
  }
  public generateTRClassName(i: number) {
    // top border
    if (i === 0) {
      return CLASS_NAMES.borderTop;
    }
    // bottom border
    else if ((i + 1) % this.props.boardWidth === 0) {
      return CLASS_NAMES.borderBottom;
    }
  }
}

export default SudokuBoard;
