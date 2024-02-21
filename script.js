document.body.addEventListener('mousedown', e => {
    e.preventDefault()
})

const squares = document.querySelectorAll('.square')
const banner = document.querySelector('.banner')

// function createPlayer (play) {
//     const plays = () => play

//     return { plays }
// }

function GameBoard(board) {
    const board2 = JSON.parse(JSON.stringify(board))

    const add = (input, play) => {
        const [row, col] = input.split(',')
        if (board2[row-1][col-1] == '-') {
            board2[row-1][col-1] = play
            return true
        } 
    }

    const add2 = (square, play) => {
        if (square.textContent) return
        board2[square.id-1] = play
        square.textContent = play
        return true
    }

    const checkWin = () => {
        const flat= [].concat.apply([], board2)   // flattens 2d board2 array
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
            if (flat[a] && flat[a]==flat[b] && flat[a]==flat[c]) {
                return flat[a]
            }
        }
        return null
    } 
    
    const show = () => {
        for (let i = 0; i < board2.length; i++) {
            let output = board2.map(innerArray => innerArray.join(' '))
            output = output.join('\n')
            console.log(output)
        }
    }

    const checkDraw = () => {
        const flat = [].concat.apply([], board2)
        return flat.every(square => square != '')
    }

    return { add, add2, checkWin, checkDraw, show }
}

function Game() {
    // const keyListen = () => document.body.addEventListener('keydown', ResetPrompt)
    let keyListener = null
    const keyListen = () => {
        keyListener = (e) => ResetPrompt(e)
        document.body.addEventListener('keydown', keyListener)
    }

    const new_grBoard = Array(9).fill('') // for storing on screen moves 
    const new_cBoard = Array(3).fill(null).map(() => Array(3).fill('-'))
    let play = 'X'
    // let player1 = createPlayer('X')
    // let player2 = createPlayer('O')
    let gr_board = GameBoard(new_grBoard)
    let con_board = GameBoard(new_cBoard)
    let winner = null
    let game_over = false
    let draw_prompt = "It's a draw!\nPlay again? (Y)es (N)o"

    const reset = () => {
        squares.forEach(square => {
            square.textContent = ''
        })

        if (keyListener) {
            document.body.removeEventListener('keydown', keyListener) 
            keyListener = null
        }
        
        play = 'X'
        gr_board = GameBoard(new_grBoard)
        banner.textContent = `Next player: ${play}`
        game_over = false
        // winner = null
        console.clear()
    }

    const loop = () => {
        banner.textContent = `Next player: ${play}`
        squares.forEach(square  => {
            square.addEventListener('click', () => {
                if (!game_over) {
                    if (gr_board.add2(square, play)) {
                        winner = checkWinner(gr_board)  // maybe use this outside eventlistener to break inf loop?
                        if (winner) {
                            keyListen() 
                            game_over = true
                            banner.textContent = `${winner} WINS! Play again? (Y)es (N)o`
                        } else {
                            play = (play == 'X') ? 'O' : 'X'
                            banner.textContent = `Next player: ${play}`
                        } 
                        if (gr_board.checkDraw()) {
                            keyListen()
                            banner.textContent = draw_prompt
                            game_over = true
                        }
                    }
                }
            })
        })
    }

    function checkWinner(board) {
        let winner = board.checkWin()
        return winner || null
    }

    function ResetPrompt(e) {
        if (e.key.toLowerCase()=='y') {
            reset()
        } else if (e.key.toLowerCase() == 'n'){
            banner.textContent = `${winner} WINS!`
            // game_over = true
        }
        //  kinda kludgy but it works:
        if (gr_board.checkDraw() && e.key.toLowerCase() =='n'){  
            banner.textContent = "It's a draw!"
            // game_over = true
        }
    }

    return { loop }
}

(function GameState() {
    const game = Game()
    
    game.loop()
})()