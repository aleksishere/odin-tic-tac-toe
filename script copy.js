const game = (() => {
    const restartButton = document.getElementById('restart-btn');
    const winnerName = document.getElementById('winner');
    //CREATE PLAYERS
    function Player(name,mark,position) {
        this.name = name
        this.mark = mark;
        this.position = position;
        this.winner = function() {
            playerMove.stopGame(name);
        }
    }

    const playerOne = new Player("Player 1", "O",[]);
    const playerTwo = new Player("Player 2", "X",[]);

    //WINNING COMBINATIONS
    const checkWinner = (() => {
        const winningCombinations = [
            [0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]
        ];

        for (let index = 0; index < winningCombinations.length; index++) {
            let checker = (arr, target) => target.every(v => arr.includes(v));
            if(checker(playerOne.position, winningCombinations[index])) {
                playerOne.winner();
                return true;
            } else if(checker(playerTwo.position, winningCombinations[index])) {
                playerTwo.winner();
                return true;
            // MAKES SURE THAT GAME ENDS IN DRAW
            } else if(checker(playerTwo.position, winningCombinations[index]) != true && checker(playerOne.position, winningCombinations[index]) != true) {
                const checkBoard = (element) => element != undefined;
                if(board.every(checkBoard)) playerMove.stopGame('draw');
            }
        }
    })
    // BOARD ARRAY
    let board = 
            [   undefined, undefined, undefined,
                undefined, undefined, undefined,
                undefined, undefined, undefined
            ];

    //PLAYERS MOVEMENT
    const playerMove = (() => {
        restartButton.style.display = 'none';
        let turn = 1;
        //CLICKABLE BUTTONS
        let tiles = document.getElementById('tiles');
        for (let index = 0; index < board.length; index++) {
            let div = document.createElement('div');
            div.classList.add('board');
            div.id = index;
            tiles.append(div);
        }

        const makeButtonsClickable = () => {
            let boardTiles = document.querySelectorAll('.board');
            boardTiles.forEach(element => element.addEventListener("click", startGame));
        }

        //STARTS GAME
        function startGame(e) {
            if(board[e.target.id] != undefined) {
                return false;
            } else {
                if(turn % 2 == 0) {
                    e.target.innerText = playerTwo.mark;
                    board[e.target.id] = playerTwo.mark;
                    turn++;
                    playerTwo.position.push(Number(e.target.id));
                    checkWinner();
                } else {
                    e.target.innerText = playerOne.mark;
                    board[e.target.id] = playerOne.mark;
                    turn++;
                    playerOne.position.push(Number(e.target.id));
                    checkWinner();
                }
            }
        }
        //DISABLE BUTTONS AND ENEBLE RESTART BUTTON
        const stopGame = (winner) => {
            restartButton.style.display = 'block';
            let boardTiles = document.querySelectorAll('.board');
            boardTiles.forEach(element => element.removeEventListener("click", startGame));
            restartButton.addEventListener('click', restartGame);
            if(winner == 'draw') {
                winnerName.innerText = 'Draw!';
            } else {
                winnerName.innerText = winner + " is the winner!";
            }
        }
        //RESETS GAME AND RESETS DATA
        const restartGame = () => {
            restartButton.style.display = 'none';
            winnerName.innerText = '';
            let boardTiles = document.querySelectorAll('.board');
            boardTiles.forEach(ele => ele.innerText = '');
            playerOne.position = [];
            playerTwo.position = [];
            turn = 1;
            board = 
            [   undefined, undefined, undefined,
                undefined, undefined, undefined,
                undefined, undefined, undefined
            ];
            playerMove.makeButtonsClickable();
        }
        return {stopGame,makeButtonsClickable};
    })();
    playerMove.makeButtonsClickable();
})();