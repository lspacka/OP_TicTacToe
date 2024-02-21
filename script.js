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
        return board2.every(square => square != '')
    }

    return { add, add2, checkWin, checkDraw, show }
}

function Game() {
    document.body.addEventListener('keydown', ResetPrompt)

    const new_grBoard = Array(9).fill('') // for storing the moves on the screen
    // const new_cBoard = Array(3).fill(null).map(() => Array(3).fill('-'))
    let play = 'X'
    // let player1 = createPlayer('X')
    // let player2 = createPlayer('O')
    let gr_board = GameBoard(new_grBoard)
    // let con_board = GameBoard(new_cBoard)
    let player = 'player 1'
    let winner, end_input
    let i = 0
    let draw_prompt = "It's a draw!\nPlay again? (Y)es (N)o"

    const reset = () => {
        squares.forEach(square => {
            square.textContent = ''
        })
        
        play = 'X'
        player = 'player 1'
        gr_board = GameBoard(new_grBoard)
        banner.textContent = `Next player: ${play}`
        console.clear()
    }

    const loop = () => {
        banner.textContent = `Next player: ${play}`
        squares.forEach(square => {
            square.addEventListener('click', () => {
                gr_board.add2(square, play)
                winner = checkWinner(gr_board)  // maybe use this outside eventlistener to break inf loop?
                if (winner) {
                    banner.textContent = `${winner} WINS! Play again? (Y)es (N)o`
                } else {
                    play = (play == 'X') ? 'O' : 'X'
                    banner.textContent = `Next player: ${play}`
                } 
                if (gr_board.checkDraw()) {
                    banner.textContent = draw_prompt
                }
            })
        })
    }

    function checkWinner(board) {
        // refactor
        let winner = board.checkWin()
        if (winner) return winner
    }

    function ResetPrompt(e) {
        if (e.key.toLowerCase()=='y') {
            reset()
        } else {
            banner.textContent = `${winner} WINS!`
        }
        //  kinda kludgy but it works:
        if (gr_board.checkDraw() && e.key.toLowerCase() =='n'){
            banner.textContent = "It's a draw!"
        }
    }

    // const loop = () => {
    //     while (true) {
    //         winner = board.checkWin()
    //         if (winner) {  
    //             reset_prompt = `${winner} WINS!!\n\nPlay again? (Y)es (N)o`
    //             console.log(`${winner} WINS!!!`)
    //             end_input = prompt(reset_prompt)

    //             while (!reset_regex.test(end_input)) {
    //                 end_input = prompt(reset_prompt)
    //             }
    //             if (end_input.toLowerCase() == 'y'){
    //                 reset()
    //             } else {
    //                 break
    //             }
    //             // break
    //         } else if (board.checkDraw()) {
    //             console.log("IT'S A DRAW!")
    //             end_input = prompt(draw_prompt)
    //             while(!reset_regex.test(end_input)) {
    //                 end_input = prompt(draw_prompt)
    //             }
    //             if (end_input.toLowerCase() == 'y') {
    //                 reset()
    //             } else {
    //                 break
    //             }
    //         }

    //         input = prompt(`${player} (${play}) Turn. \nEnter your move (row, column): `)
    //         player = (play == 'X') ? 'player 2' : 'player 1'
    
    //         if (input_regex.test(input)) {
    //             if (board.add(input, play)) {
    //                 console.log('--------------')
    //                 board.show()
    //                 play = (play == 'X') ? 'O' : 'X'
    //             } else {
    //                 console.log('Invalid move. Please select an empty cell')
    //                 player = (play == 'X') ? 'player 1' : 'player 2'
    //             }
                
    //         } else {
    //             player = (play == 'X') ? 'player 1' : 'player 2'
    //             console.log('Invalid input format. Please enter in the format: row, column')
    //         }
    //     }
    // }

    return { loop }
}

(function GameState() {
    const game = Game()
    
    game.loop()
})()