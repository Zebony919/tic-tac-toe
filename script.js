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

const displayController = (() => {
    const printBoard = () => {
        const board = gameBoard.getBoard();
        console.log(`
            ${board[0] || "-"} | ${board[1] || "-"} | ${board[2] || "-"}
            -----------
            ${board[3] || "-"} | ${board[4] || "-"} | ${board[5] || "-"}
            -----------
            ${board[6] || "-"} | ${board[7] || "-"} | ${board[8] || "-"}
        `);
    };

    return { printBoard };
})();

const gameController = (() => {
    let currentPlayer = "X";

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

    const playRound = (index) => {

        if (gameBoard.setCell(index, currentPlayer)) {
            displayController.printBoard();

            const result = checkWinner();
            if (result === "tie") {
                console.log("It's a tie!");
                gameBoard.reset();
                return;
            } else if (result) {
                console.log(`${result} wins!`);
                gameBoard.reset();
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            console.log(`${currentPlayer} turn`);
        } else {
            console.log("Cell already taken!");
        }
    };

    return { playRound };
})();