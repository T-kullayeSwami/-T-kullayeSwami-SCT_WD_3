const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.innerText = cell;
    div.addEventListener('click', () => makeMove(index));
    board.appendChild(div);
  });
}

function makeMove(index) {
  if (cells[index] !== '' || !gameActive) return;

  cells[index] = currentPlayer;
  drawBoard();
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      statusText.innerText = `Player ${cells[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!cells.includes('')) {
    statusText.innerText = "It's a Draw!";
    gameActive = false;
  }
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.innerText = "Player X's Turn";
  drawBoard();
}

drawBoard();
