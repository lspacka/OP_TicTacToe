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

    return { add, checkWin, show }
}

function Game() {
    //  Maybe I should put all this init stuff in GameState()?
    let play = 'X'
    let player1 = createPlayer('X')
    let player2 = createPlayer('O')
    let board = GameBoard(new_board)
    let player = 'player 1'
    let start = true
    let winner, input, end_input, reset_prompt

    let input_regex = /^\s*[1-3]\s*,\s*[1-3]\s*$/
    let reset_regex = /^[ynYN]$/

    const loop = () => {
        while (true) {
            winner = board.checkWin()
            if (winner) {
                reset_prompt = `${winner} WINS!\n\nPlay again? (Y)es (N)o`
                console.log(`${winner} WINS!!!`)
                end_input = prompt(reset_prompt)
    
                //  Reset game prompt loop
                while (!reset_regex.test(end_input)) {  
                    if (reset_regex.test(end_input)) {
                        break
                    } else {
                        end_input = prompt(reset_prompt) 
                    }
                }
                // start = (end_input=='y' || end_input=='Y') ? true : false
                break
            }
    
            input = prompt(`${player} (${play}) Turn. \nEnter your move (row, column): `)
            player = (play == 'X') ? 'player 2' : 'player 1'
    
            if (input_regex.test(input)) {
                board.add(input, play)
                console.log('--------------')
                board.show()
                play = (play == 'X') ? 'O' : 'X'
            } else {
                player = (play == 'X') ? 'player 1' : 'player 2'
                console.log('Invalid input format. Please enter in the format: row, column')
            }
        }
        start = (end_input=='y' || end_input=='Y') ? true : false
    }

    return { start, loop }
}

(function GameState() {
    const game = Game()
    let running = game.start
    // game.loop()
    console.log(running)
    if (running) {
        running = game.start
        game.loop()
    } else {
        console.log(running)
    }
})()