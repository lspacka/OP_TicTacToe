const new_board = Array(3).fill(null).map(() => Array(3).fill('-'))
const dummy = Array(3).fill(null).map(() => Array(3).fill('X'))

function createPlayer (play) {
    const plays = () => play

    return { plays }
}

function GameBoard(board) {  
    const add = (input, play) => {
        const [row, col] = input.split(',')
        board[row-1][col-1] = play
    }

    const checkWin = () => {
        const flat = [].concat.apply([], board)
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (flat[a] && flat[a]==flat[b] && flat[a]==flat[c] &&
                flat[a]!='-' && flat[b]!='-' && flat[c]!='-') {
                return flat[a]
            }
        }
        return null
    } 
    
    const show = () => {
        for (let i = 0; i < board.length; i++) {
            let output = board.map(innerArray => innerArray.join(' '))
            output = output.join('\n')
            console.log(output)
        }
    }

    return { add, checkWin, show }
}

function Game() {
    let play = 'X'
    let player1 = createPlayer('X')
    let player2 = createPlayer('O')
    let board = GameBoard(new_board)
    // let board2 = GameBoard(dummy)
    let winner, input, input_pattern

    const CurrentPlayer = (p1, p2) => {
        //
    }

    while (true) {
        winner = board.checkWin()
        if (winner) {
            console.log(`${winner} WINS!!!`)
            break
        }

        input = prompt('Enter your move (row, column): ')
        input_pattern = /^\s*[1-3]\s*,\s*[1-3]\s*$/

        if (input_pattern.test(input)) {
            board.add(input, play)
            console.log('--------------')
            board.show()
            play = (play == 'X') ? 'O' : 'X'
        } else {
            console.log('Invalid input format. Please enter in the format: row, column')
        }
    }
}

Game()

//   for (let i = 0; i < Gameflat_Board.flat_board.length; i += 3) {
//     console.log(Gameflat_Board.flat_board.slice(i, i + 3).join(' '));
//  }

// for (let i = 0; i < flat_board.length; i++) {
//     console.log(flat_board[i]);
// } 