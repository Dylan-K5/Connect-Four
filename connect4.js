/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty height x width matrix array
  // loop over the height and call it y
  // push an array to each height loop and make it the length of the height
  for (let y = 0; y < height; y++) {
    board.push(Array.from({ length: width }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  let htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code

  // Creates the top row of the Board.
  let top = document.createElement('tr');
  // Gives it the ID of column-top
  top.setAttribute('id', 'column-top');
  // Gives it a click event listener
  top.addEventListener('click', handleClick);

  // Loops over it
  for (let x = 0; x < width; x++) {
    // creates a number of td based on the width of the board (7)
    let headCell = document.createElement('td');
    // Gives each td an id of their index
    headCell.setAttribute('id', x);
    // Appends each td to the row previously created
    top.append(headCell);
  }
  // Appends the JS board to the row previously created
  htmlBoard.append(top);

  // TODO: add comment for this code

  // Looping over the height of the board & creating an amount of rows based on height #
  for (let y = 0; y < height; y++) {
    const row = document.createElement('tr');

    // Looping over the width of the board & creating individual squares based on width #
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('td');

      // Giving each cell an ID based on its position on the board
      cell.setAttribute('id', `${y}-${x}`);

      // Appending the cells to the rows
      row.append(cell);
    }
    // Appending the rows to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // loop over the column, if the y,x coordinate isnt found just return y
  for (let y = height - 1; y >= 0; y--)
    if (!board[y][x]) {
      return y;
    }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  // Creating the div
  const newPiece = document.createElement('div');

  // Adding CSS Class
  newPiece.classList.add('piece');

  // Adding Current Player Class
  newPiece.classList.add(`p${currPlayer}`);

  // Finding the right piece to put the tile
  const placement = document.getElementById(`${y}-${x}`);
  // Appending the div to the right tile
  placement.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // if every cell within every row is true(filled) return tie
  // else return whoever won with the last move
  if (board.every((row) => row.every((cell) => cell))) {
    alert("It's a Tie!");
  } else {
    alert(`Player ${currPlayer} won!`);
  }
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  // current players move coordinates
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (board.every((row) => row.every((cell) => cell))) {
    return endGame('Tie!');
  }

  // Switching Players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // looping over the entire board
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // checking for horizontal win
      let horiz = [
        // checking for a piece
        [y, x],
        // checking if theres a piece to the right of the starting piece x 3
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];

      // checking for vertical win
      let vert = [
        // checking for a piece
        [y, x],
        // checking if theres a piece above the starting piece x 3
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];

      // checking for diagonal win to the right
      let diagDR = [
        // checking for a piece
        [y, x],
        // checking if theres a piece one above and one to the right of the starting piece x 3
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];

      // checking for a diagonal win to the left
      let diagDL = [
        // checking for a piece
        [y, x],
        // checking if theres a piece one above and one to the left of the starting piece x 3
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
