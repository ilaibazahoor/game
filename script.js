const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    cells = Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    }
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!cells[index]) {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("disabled");

        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} Wins! 🎉`;
            disableBoard();
            return;
        } else if (cells.every(cell => cell !== null)) {
            status.textContent = "It's a Draw!";
            return;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
}

function resetGame() {
    currentPlayer = "X";
    status.textContent = "Player X's Turn";
    createBoard();
}

createBoard();
