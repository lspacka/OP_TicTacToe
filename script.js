let empty_board = Array(3).fill(null).map(() => Array(3).fill(' '))

function GameBoard(board) {  
    const add = (input, play) => {
        const [row, col] = input.split(',')
        board[row-1][col-1] = play
    }
    const show = () => {
        for (let i = 0; i < board.length; i++) {
                console.log(board[i]);
            }
    }

    return { add, show }
}

function Game() {
    let play = 'X'
    let board = GameBoard(empty_board)
    let i = 0

    while (i < 6) {
        let input = prompt('Enter your move (row, column): ')
        let input_pattern = /^\s*[1-3]\s*,\s*[1-3]\s*$/

        if (input_pattern.test(input)) {
            board.add(input, play)
            console.log('--------------------------')
            board.show()
        } else {
            console.log('Invalid input format. Please enter in the format: row, column')
        }
        i++
    }
}

Game()

// let g_board = GameBoard(empty_board)
// g_board.add()
// g_board.show()

function createPlayer (name) {
    // const pl_name = name
    const getName = () => name

    return { getName }
}

function calculateWinner(squares) {
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
      if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
        squares[a]
      }
    }
    return null
  }

//   for (let i = 0; i < GameBoard.board.length; i += 3) {
//     console.log(GameBoard.board.slice(i, i + 3).join(' '));
//  }

// for (let i = 0; i < board.length; i++) {
//     console.log(board[i]);
// } 