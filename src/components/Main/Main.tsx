import React, { Component, ChangeEvent } from 'react';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import SudokuOptions from '../SudokuOptions/SudokuOptions';
import { ISudokuSolveRequest } from '../../interfaces/ISudokuSolveRequest';
import { ISudokuSolveResponse } from '../../interfaces/ISudokuSolveResponse';

import Example4by4JSON from '../test/4by4.json'
import Example9by9JSON from '../test/9by9.json'
import Example16by16JSON from '../test/16by16.json'
import Example25by25JSON from '../test/25by25.json'
import Example36by36JSON from '../test/36by36.json'
import Example49by49JSON from '../test/49by49.json'
import Example64by64JSON from '../test/64by64.json'
import Example81by81JSON from '../test/81by81.json'
import Example100by100JSON from '../test/100by100.json'


type MainProps = {
  //
};

const maxTimeOut = 10;
const intialStatus = 'Click Solve'
const solvedStatus = 'Succesfully Solved!'
const failedStatus = 'Could not solve.'

class Main extends Component<MainProps, { rows: Array<Array<string>>, boardWidth: number, possibleValues: Array<string>, numberOfThreads: number, timeOut: number, status: string, numbersOnly: boolean }> {

  constructor(props: MainProps) {
    super(props);
    const defaultWidth = 3;
    const emptyBoard = Example9by9JSON.rows;
    const defaultPossibleValues = this.createPossibleValues(defaultWidth * defaultWidth)
    this.state = {
      rows: emptyBoard,
      boardWidth: defaultWidth,
      possibleValues: defaultPossibleValues,
      numberOfThreads: 1,
      timeOut: 3,
      status: intialStatus,
      numbersOnly: true
    }
    // setters
    this.setBoard = this.setBoard.bind(this);
    this.setBoardWidth = this.setBoardWidth.bind(this);
    this.setPossibleValues = this.setPossibleValues.bind(this);

    // generators
    this.createEmptyBoard = this.createEmptyBoard.bind(this);
    this.createPossibleValues = this.createPossibleValues.bind(this);

    // clone
    this.cloneRows = this.cloneRows.bind(this);
    this.clonePossibleValues = this.clonePossibleValues.bind(this);

    // handlers
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handlePossibleValueChange = this.handlePossibleValueChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleTimeoutChange = this.handleTimeoutChange.bind(this);
    this.handleNumberOfThreadsChange = this.handleNumberOfThreadsChange.bind(this);
    this.handleSolve = this.handleSolve.bind(this);
    this.handleNumbersOnlyChange = this.handleNumbersOnlyChange.bind(this);

    // utils
    this.sendSolveBoard = this.sendSolveBoard.bind(this);
  }
  public render() {

    return <div className='center-container'>
      <div className="center-custom">
        <div className="title">
          <h2>Sudoku Solver</h2>
        </div>
        <div className="sudokuBoardContainer">
          <SudokuBoard rows={this.state.rows} boardWidth={this.state.boardWidth} handleChange={this.handleDataChange} numbersOnly={this.state.numbersOnly}></SudokuBoard>
        </div>
        <div className="sudokuBoardControlPanel">
          <div>
            <button type="button" className="btn btn-outline-secondary" onClick={this.handleClear} style={{marginRight:"0.5rem"}}>Clear</button>
            <button type="button" className="btn btn-outline-secondary" onClick={this.handleSolve}>Solve</button>
          </div>
          <br></br>
          <div>
            <div>
              Status: {this.state.status}
              {
                this.state.status === solvedStatus ? <i style={{ color: "green" }} className="fab fa-check fa-solid"></i> :
                this.state.status === failedStatus ? <i style={{ color: "red" }} className="fab fa-xmark fa-solid"></i> :
                this.state.status === intialStatus ? <i style={{ color: "orange" }} className="fab fa-hand-point-up fa-solid"></i> :
                <div></div>
              }
            </div>
          </div>
        </div>
        <br></br>
        <div>
          <h2>Settings<i className="fab fa-gear fa-solid"></i></h2>
          <div className="boardSizeContainer"> Board Width: <i>"NxN"</i> <input style={{ width: "40px" }} type="number" pattern="[0-9]*" value={this.state.boardWidth} onChange={this.handleWidthChange}></input></div>
          <br></br>
          <div className="boardConfigContainer">
            <div>Numbers Only <input type="checkbox" checked={this.state.numbersOnly} onChange={this.handleNumbersOnlyChange}></input></div>
            <SudokuOptions possbileValues={this.state.possibleValues} handlePossbileValueChange={this.handlePossibleValueChange}></SudokuOptions>
          </div>
          <br></br>
        </div>
      </div>
    </div >;
  }
  public handleWidthChange(event: ChangeEvent<HTMLInputElement>) {
    const newWidth = parseInt(event.target.value)
    this.setBoardWidth(newWidth);
    let board = this.createEmptyBoard(newWidth * newWidth);
    let possibleValues = this.createPossibleValues(newWidth * newWidth);
    let numbersOnly = true;
    if (newWidth === 2) {
      board = Example4by4JSON.rows
    } else if (newWidth === 3) {
      board = Example9by9JSON.rows
    } else if (newWidth === 4) {
      board = Example16by16JSON.rows
      numbersOnly = false;
      // convert to hexadoku
      const hexadokuPossibleValues = possibleValues.map((val => {
        const num = Number.parseInt(val);
        if (num <= 10) return (num - 1).toString();
        else if (num === 11) return "A";
        else if (num === 12) return "B";
        else if (num === 13) return "C";
        else if (num === 14) return "D";
        else if (num === 15) return "E";
        else if (num === 16) return "F";
        else return "";
      }));
      if (hexadokuPossibleValues) possibleValues = hexadokuPossibleValues;
    } else if (newWidth === 5) {
      const alphabetArray = [];

      // create the alphabet from A-Y
      for (let i = 65; i <= 89; i++) {
        const char = String.fromCharCode(i);
        alphabetArray.push(char);
      }

      possibleValues = alphabetArray;
      board = Example25by25JSON.rows
      numbersOnly = false;
    } else if (newWidth === 6) {
      board = Example36by36JSON.rows;
    } else if (newWidth === 7) {
      board = Example49by49JSON.rows;
    } else if (newWidth === 8) {
      board = Example64by64JSON.rows;
    } else if (newWidth === 9) {
      board = Example81by81JSON.rows;
    } else if (newWidth === 10) {
      board = Example100by100JSON.rows;
    }
    this.setBoard(board);
    this.setPossibleValues(possibleValues);
    this.setState({ numbersOnly: numbersOnly })
  }



  public handleClear() {
    const emptyBoard = this.createEmptyBoard(this.state.boardWidth * this.state.boardWidth);
    this.setBoard(emptyBoard);
  }

  public setBoard(newRows: Array<Array<string>>) {
    this.setState({ rows: newRows });
  }

  public setBoardWidth(newWidth: number) {
    this.setState({ boardWidth: newWidth });
  }

  public setPossibleValues(newPossibleValues: Array<string>) {
    this.setState({ possibleValues: newPossibleValues });
  }

  public setStatus(newStatus: string) {
    this.setState({ status: newStatus })
  }

  public createEmptyBoard(n: number) {
    const rows = [];
    for (var i = 0; i < n; i++) {
      const row = [];
      for (var j = 0; j < n; j++) {
        row.push('');
      }
      rows.push(row);
    }
    return rows;
  }

  public createPossibleValues(n: number) {
    const possibleValues = [];
    for (var i = 1; i <= n; i++) {
      possibleValues.push(i.toString());
    }
    return possibleValues;
  }
  public handleDataChange(i: number, j: number, val: string) {
    const cloned = this.cloneRows();
    cloned[i][j] = val.repeat(1);
    this.setBoard(cloned);
  }

  public handlePossibleValueChange(i: number, val: string) {
    const cloned = this.clonePossibleValues();
    cloned[i] = val.repeat(1);
    this.setPossibleValues(cloned);
  }
  public handleTimeoutChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newVal = parseInt(event.target.value);
    // max time out
    if (newVal > maxTimeOut) {
      newVal = maxTimeOut;
    }
    this.setState({
      timeOut: newVal
    })
  }
  public handleNumberOfThreadsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newVal = parseInt(event.target.value);
    const maxThreadCount = this.state.boardWidth * this.state.boardWidth;
    // max thread
    if (newVal > maxThreadCount) {
      newVal = maxThreadCount;
    }
    this.setState({
      numberOfThreads: newVal
    })
  }

  public handleNumbersOnlyChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ numbersOnly: event.target.checked })
  }

  public handleSolve() {
    const requestObj: ISudokuSolveRequest = {
      board: {
        rows: this.state.rows,
        possibleValues: this.state.possibleValues
      },
      config: {
        numberOfThreads: this.state.numberOfThreads,
        timeoutSeconds: this.state.timeOut
      }
    };
    this.sendSolveBoard(requestObj);
  }

  public clonePossibleValues() {
    const origPossibleValues = this.state.possibleValues;
    const clonedPossibleValues = [];
    for (var i = 0; i < origPossibleValues.length; i++) {
      clonedPossibleValues.push(origPossibleValues[i].repeat(1));
    }
    return clonedPossibleValues;
  }
  public cloneRows() {
    const origRows = this.state.rows;
    const rows = [];
    for (var i = 0; i < origRows.length; i++) {
      const row = [];
      for (var j = 0; j < origRows.length; j++) {
        row.push(origRows[i][j].repeat(1));
      }
      rows.push(row);
    }
    return rows;
  }

  async sendSolveBoard(requestObj: ISudokuSolveRequest) {
    // convert request into string
    console.log('sending solve request with the following data');
    console.log(requestObj);
    const requestObjAsStr = JSON.stringify(requestObj);
    console.log(requestObjAsStr);

    // update front-end
    this.setStatus('Solving...');
    const url = "https://3sladmn5q0.execute-api.us-east-1.amazonaws.com/default/Sudoku-Solver";

    // call request
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestObj),
    }).then(response => response.json())
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

    // handle response
    if (response) {
      // log sucess
      console.log('received response')
      console.log(response)

      // update board state
      const solution: ISudokuSolveResponse = response;
      
      // update status
      if (solution.solved) {
        this.setBoard(solution.rows);
        this.setStatus(solvedStatus);
      } else {
        this.setStatus(failedStatus);
      }
    } else {
      // log error message
      console.log(response);
      this.setStatus(failedStatus);
    }
  }

}

export default Main;
