import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import { TourProvider } from '@reactour/tour'

const tourStyle = {
  backgroundColor: 'grey',
  color: 'white',
};

const steps = [
  {
    selector: ".title",
    content: () =>
      <div>
        <p>
          Introducing the remarkable Sudoku Solver! Capable of efficiently solving Sudoku or Hexadoku puzzles of any <b>size</b> or <b>difficulty</b>, up to an impressive 64 x 64 size!
        </p>
      </div>,
    style: tourStyle,
  },
  {
    selector: ".sudokuBoardContainer",
    content: () =>
      <div>
        <p>
          Input your very own Sudoku puzzle and effortlessly navigate through it using your keyboard &larr; &uarr; &darr; &rarr;
        </p>
      </div>,
    style: tourStyle,
  },
  {
    selector: ".sudokuBoardControlPanel",
    content: () =>
      <div>
        <p>
          Simply click "Solve" and instantly reveal the solution while effortlessly checking the status of your puzzle!
        </p>
      </div>,
    style: tourStyle,
  },
  {
    selector: ".boardSizeContainer",
    content: () =>
      <div>
        <p>
          Customize the "Board Width," granting you the freedom to adjust the puzzle size to any scale you desire!
        </p>
      </div>,
    style: tourStyle,
  },
  {
    selector: ".boardConfigContainer",
    content: () =>
      <div>
        <p>
          Simply unchecking "Numbers Only" and seamlessly switch to Hexadoku, allowing you to explore and assign any conceivable value to each cell with utmost ease!
        </p>
      </div>,
    style: tourStyle,
  }
  // ...
]

function App() {
  return (
    <div className="App">
      <TourProvider
        steps={steps}
        defaultOpen={true}
      >
        <Main></Main>
      </TourProvider>
    </div>
  );
}

export default App;
