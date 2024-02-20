//  Refactor by chatGPT. not quite there, but w/e...

const BOARD_SIZE = 3;

class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
}

class GameBoard {
    constructor() {
        this.board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('-'));
    }

    isValidMove(row, col) {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && this.board[row][col] === '-';
    }

    addMove(row, col, symbol) {
        this.board[row][col] = symbol;
    }

    checkWin() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (this.board[Math.floor(a / BOARD_SIZE)][a % BOARD_SIZE] !== '-' &&
                this.board[Math.floor(a / BOARD_SIZE)][a % BOARD_SIZE] === this.board[Math.floor(b / BOARD_SIZE)][b % BOARD_SIZE] &&
                this.board[Math.floor(a / BOARD_SIZE)][a % BOARD_SIZE] === this.board[Math.floor(c / BOARD_SIZE)][c % BOARD_SIZE]) {
                return this.board[Math.floor(a / BOARD_SIZE)][a % BOARD_SIZE];
            }
        }
        return null;
    }

    isDraw() {
        return this.board.every(row => row.every(cell => cell !== '-'));
    }

    display() {
        console.log(this.board.map(row => row.join(' ')).join('\n'));
    }
}

class TicTacToe {
    constructor() {
        this.player1 = new Player('X');
        this.player2 = new Player('O');
        this.currentPlayer = this.player1;
        this.board = new GameBoard();
    }

    switchPlayer() {
        this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    }

    reset() {
        this.board = new GameBoard();
        this.currentPlayer = this.player1;
    }

    play() {
        while (true) {
            this.board.display();
            const input = prompt(`${this.currentPlayer.symbol} Turn. \nEnter your move (row, column): `);
            const [row, col] = input.split(',').map(val => parseInt(val.trim()) - 1);

            if (this.board.isValidMove(row, col)) {
                this.board.addMove(row, col, this.currentPlayer.symbol);
                if (this.board.checkWin()) {
                    console.log(`${this.currentPlayer.symbol} WINS!!!`);
                    break;
                } else if (this.board.isDraw()) {
                    console.log("IT'S A DRAW!");
                    break;
                }
                this.switchPlayer();
            } else {
                console.log('Invalid move. Please select an empty cell within the board range.');
            }
        }
    }
}

(function startGame() {
    const ticTacToe = new TicTacToe();
    ticTacToe.play();
})();
