const X_CLASS = 'x';
const O_CLASS = 'o';
let xTurn = true;

const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
    status.innerText = xTurn ? "X's turn" : "O's turn";
}

function setBoardHoverClass() {
    document.body.classList.remove(X_CLASS);
    document.body.classList.remove(O_CLASS);
    if (xTurn) {
        document.body.classList.add(X_CLASS);
    } else {
        document.body.classList.add(O_CLASS);
    }
}

function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });

    if (draw) {
        status.innerText = 'It\'s a Draw!';
    } else {
        status.innerText = `${xTurn ? "X" : "O"} wins`;
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

const restartButton = document.getElementById('restartBtn');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove(X_CLASS, O_CLASS);
        cell.addEventListener('click', handleClick, { once: true });
    });
    xTurn = true;
    status.innerText = "X's turn";
    setBoardHoverClass();
}

function setBoardHoverClass() {
  const body = document.body;
  body.style.backgroundColor = xTurn ? '#007bff' : '#008000'; // Blue for 'X', Green for 'O'
  body.classList.remove(X_CLASS);
  body.classList.remove(O_CLASS);
  if (xTurn) {
      body.classList.add(X_CLASS);
  } else {
      body.classList.add(O_CLASS);
  }
}
