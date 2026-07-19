let gameDetail = {
    "gameBordState" : [],
    'grids' : document.querySelectorAll(".gameGrid"),
    'reset' : document.querySelector("#reset"),
    'result' : document.querySelector("#result"),
    'form' : document.querySelector("#form"),
    'closebtn' : document.querySelector("#closebtn"),
};

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  //row
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  //coloume
    [0, 4, 8], [2, 4, 6]              //diagonal
];

const gameWinAlert = (winnerSymbol) => {
    const name = (winnerSymbol === 'X') ? gameDetail.X || 'Player with X' : gameDetail.O || 'Player with O';
    const winMassage = document.createElement("div");
    winMassage.textContent = `${name} has won 🫡`;

    gameDetail.result.appendChild(winMassage);
    gameDetail.grids.forEach((gameGrid) => {
        gameGrid.removeEventListener("click", gameGridEvent)
    })
}

const gameWinCheck = (board) => {
    for (const combination of winningCombination) {
        const [a, b, c] = combination;
        if (board[a] && board[a] == board[b] && board[a] == board[c]) {
            gameWinAlert(board[a]);
            return;
        }
    }
    if (board.filter(String).length === 9) {
        const drawMassage = document.createElement("div");
        drawMassage.textContent = "The game was a draw . well played 👍";
        gameDetail.result.appendChild(drawMassage);
        return;
    }
    return;
}

const changeTern = (function () {
    let choise = 0;
    function getChoise() {
        if ((choise++) % 2 === 0) return 'O';
        return 'X';
    }
    return getChoise;
})();

const gameGridEvent = (e) => {
    const currentGrid = e.currentTarget;
    if (currentGrid.textContent) return;

    const currentGridChoise = changeTern();
    currentGrid.textContent = currentGridChoise;
    const index = parseInt(currentGrid.id);
    gameDetail.gameBordState[index] = currentGridChoise;
    gameWinCheck(gameDetail.gameBordState);
}

const resetEvent = () => {
    gameDetail.result.textContent = '';
    gameDetail = {};
    gameDetail.grids.forEach((gameGrid) => {
        gameGrid.textContent = '';
    })
    gameBordState = [];
    gameDetail.grids.forEach((gameGrid) => {
        gameGrid.addEventListener("click", gameGridEvent);
    });
    dialog.showModal();
}

const formSubmitEvent = (e) => {
    e.preventDefault();
    gameDetail.X =  document.querySelector('#playerWithX').value;
    gameDetail.O =  document.querySelector('#playerWithO').value;
    dialog.close();
}

gameDetail.form.addEventListener("submit", formSubmitEvent);
gameDetail.reset.addEventListener('click', resetEvent);
gameDetail.closebtn.addEventListener("click", (e) => { e.preventDefault(); dialog.close(); })

gameDetail.grids.forEach((gameGrid) => {
    gameGrid.addEventListener("click", gameGridEvent);
});

dialog.showModal();