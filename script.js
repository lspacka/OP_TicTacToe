let lol = 0
let history = []

function createPlayer (name) {
    // const pl_name = name
    const getName = () => name

    return { getName }
}

const GameBoard = (play) => {
    this.board = ['X', 'O', 'O', 'X', 'X', 'O', 'O', 'X', 'O']
    // this.board = []
    // this.add = () => { this.board.push(play) }
    // this.board.push(play)
    // this.show = () => {
    //     for (let i = 0; i < this.board.length; i += 3) {
    //         console.log(this.board.slice(i, i + 3).join(' '));
    //     }
    // }
    this.show = () => {
        for (let i = 0; i < history.length; i += 3) {
            console.log(history.slice(i, i + 3).join(' '));
        }
    }

    return { show }  // gotta expose board so GameState can push into it (?)
}

function GameState() {
    let play
    let board
        do {
            play = prompt('Type X or O, then press Enter')
        } while (play!=='x' && play!=='o' && play!=='X' && play!=='O')
        
        history.push(play)
        board = GameBoard(history)
        console.log(`You played ${play}`)
        board.show()
}

while (lol < 6) {
    GameState()
    lol++
}
// GameState()
// GameBoard().show()

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