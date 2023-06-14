# Sudoku Solver Front End

The Sudoku Solver exhibits dynamic capabilities by efficiently solving up to **64 x 64** Sudoku puzzles from **EASY** up to **EXPERT**. Furthermore, it extends its functionality to encompass **Hexadoku** puzzles, which employ letters instead of numbers. The solver can execute in **parallel** using multiple threads on a single computer for maxium effeciency. Currently, it is hosted on the AWS Lambda platform. Test it out [here](https://www.colegannaway.com/sudoku-solver-front-end/).


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive Interface: Allows users to input Sudoku puzzles and view the solving process step-by-step.
- Difficulty Levels: Supports different levels of Sudoku puzzles, ranging from easy to expert.
- Massive Scale: Supports up to up to **64 x 64** puzzles yielding 4096 boxes!
- Multiple Types: Supports **Sudoku** or **Hexadoku** puzzles
- Clear and Reset: Enables users to clear the puzzle or reset it to its original state.

## Demo

You can access the live website [here](https://www.colegannaway.com/sudoku-solver-front-end/).

## Installation

As this is a live website, there is no installation required. Simply open the provided link in your web browser to access the Sudoku Solver Front End website.

1. Clone the repository: `git clone https://github.com/cole-gannaway/sudoku-solver-front-end.git`
2. Navigate to the project directory: `cd sudoku-solver-front-end`
3. In the project directory, you can run:
    - ### `npm run start`
    - Runs the app in the development mode.<br />
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Technologies Used

The Sudoku Solver Front End website utilizes the following technologies:

- [React](https://react.dev/)
- [Redux](https://redux.js.org/)

## Contributing

As this website is the personal project of Cole Gannaway, external contributions are not accepted at this time.

## License

The contents of this repository are licensed under the [MIT License](LICENSE).
