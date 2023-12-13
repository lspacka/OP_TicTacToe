let play = ''
let msg_display = document.querySelector('.message')
const history = []
const squares = document.querySelectorAll('.square')

squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (square.textContent == '') {
          if (play=='' || play=='O') play = 'X'
          else play = 'O'
          square.textContent = play
          history.push(play)
          // console.log(history)
        }
    })
})

let winner = calculateWinner(history)
let message = 'Next Player: '
if (winner) {
  msg_display.TextContent = message + winner
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