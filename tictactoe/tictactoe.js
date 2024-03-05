let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let isComputerMode = true; // Start with computer mode by default
let isComputerTurn = false; // Flag to indicate whether it's the computer's turn

function toggleMode() {
  isComputerMode = !isComputerMode;
  const toggleButton = document.getElementById('toggleButton');
  if (isComputerMode) {
    toggleButton.textContent = 'Play Against Computer';
  } else {
    toggleButton.textContent = 'Play with Two Players';
  }
  reset(); // Reset the game when switching modes
}

function handleClick(index) {
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    checkWinner();
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player only if the game is not over
      if (isComputerMode && currentPlayer === 'O') {
        isComputerTurn = true;
        makeComputerMove(); // Call makeComputerMove if it's the computer's turn
      } else {
        document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
      }
    }
  }
}

function makeComputerMove() {
  let emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];
    gameBoard[computerMove] = 'O';
    document.getElementById(`cell-${computerMove}`).innerText = 'O';
    checkWinner();
    currentPlayer = 'X';
    isComputerTurn = false; // Reset computer turn flag
    document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      document.getElementById('message').innerText = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameOver = true;
    document.getElementById('message').innerText = 'It\'s a draw!';
    return;
  }
}

function reset() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  isComputerTurn = false; // Reset computer turn flag
  document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).innerText = '';
  }
}

document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

