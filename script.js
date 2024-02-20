document.body.addEventListener('keydown', KeyFunc)
document.body.addEventListener('mousedown', e => {
    e.preventDefault()
})

// const new_board = Array(3).fill(null).map(() => Array(3).fill('-'))
const board = document.querySelectorAll('.square')
const banner = document.querySelector('.banner')

function KeyFunc(e) {
    if (e.key.toLowerCase()=='y' || e.key.toLowerCase()=='n') {
        banner.textContent = 'YES'
        console.log(e.key)
    }
}

// function createPlayer (play) {
//     const plays = () => play

//     return { plays }
// }

function GameBoard(board) {
    // board = JSON.parse(JSON.stringify(board))

    const add = (input, play) => {
        const [row, col] = input.split(',')
        if (board[row-1][col-1] == '-') {
            board[row-1][col-1] = play
            return true
        } 
    }

    const checkWin = () => {
        const flat = [].concat.apply([], board)   // flattens 2d board array
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

    const checkDraw = () => {
        const flat = [].concat.apply([], board)
        return flat.every(square => square != '-')
    }

    return { add,  checkWin, checkDraw, show }
}

function Game() {
    const new_grBoard = Array(9).fill(' ') // for storing the moves on the screen
    let play = 'X'
    // let player1 = createPlayer('X')
    // let player2 = createPlayer('O')
    let gr_board = GameBoard(new_grBoard)
    let player = 'player 1'
    let winner, input, end_input, reset_prompt
    let i = 0

    // let input_regex = /^\s*[1-3]\s*,\s*[1-3]\s*$/
    // let reset_regex = /^[ynYN]$/
    // let draw_prompt = "IT'S A DRAW!!\n\nPlay again? (Y)es (N)o"


    const reset = () => {
        play = 'X'
        player = 'player 1'
        // board = GameBoard(new_board)
        console.clear()
    }

    const loop = () => {
        banner.textContent = `Next player: ${play}`
        winner = gr_board.checkWin()

        board.forEach(square => {
            square.addEventListener('click', () => {
                square.textContent = play
                gr_board[square.id-1] = play
                console.log(gr_board)
                play = (play == 'X') ? 'O' : 'X'
                banner.textContent = `Next player: ${play}`
            })
        })
        
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