const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = () => board;
    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    }
    const reset = () => board = ["", "", "", "", "", "", "", "", ""]

    return { getBoard, setCell, reset };
})();

const gameController = (() => {
    let currentPlayer = "X";
    let gameActive = true;
    let xScore = document.querySelector(".xScore");
    let oScore = document.querySelector(".oScore");

    const checkWinner = () => {
        const board = gameBoard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.every(cell => cell !== "")) return "tie";
        return null;
    };

    const resetGame = () => {
        gameBoard.reset();
        gameActive = true;
        currentPlayer = "X";
        xScore.textContent = 0;
        oScore.textContent = 0;
    }

    const playRound = (index) => {
        if (!gameActive) return;  
        
        if (gameBoard.setCell(index, currentPlayer)) {
            
            const result = checkWinner();
            if (result) {
                if (result === "tie") {
                    alert("Tie!");
                } else {
                    alert(`${result} wins!`);
                }
                gameActive = false;  
                setTimeout(() => { 
                    resetGame();
                    domController.updateDisplay(); 
                }, 1000);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    };

    return { playRound, resetGame };
})();

// Display Board on browser
const domController = (() => {
    const squares = document.querySelectorAll(".square");

    const updateDisplay = () => {
        const board = gameBoard.getBoard();
        squares.forEach((square, index) => {
            square.textContent = board[index];
        });
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        gameController.playRound(Number(index));
        updateDisplay();
    };

    squares.forEach(square => {
        square.addEventListener("click", handleClick);
    });

    return { updateDisplay };
})();