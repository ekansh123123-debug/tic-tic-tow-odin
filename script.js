const grids = document.querySelectorAll(".gameGrid");
const reset = document.querySelector("#reset");
const result = document.querySelector("#result");
const form = document.querySelector("#form");
const closebtn = document.querySelector("#closebtn");
let gameBordState = ['', '', '', '', '', '', '', '', ''];
let player = {};

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  //row
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  //coloume
    [0, 4, 8], [2, 4, 6]              //diagonal
];

const gameWinAlert = (winnerSymbol) => {
    const name = (winnerSymbol === 'X') ? player.X || 'Player with X' : player.O || 'Player with O';
    const winMassage = document.createElement("div");
    winMassage.textContent = `${name} has won 🫡`;

    result.appendChild(winMassage);
    grids.forEach((gameGrid) => {
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
        result.appendChild(drawMassage);
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
    gameBordState[index] = currentGridChoise;
    gameWinCheck(gameBordState);
}

const resetEvent = () => {
    result.textContent = '';
    player = {};
    grids.forEach((gameGrid) => {
        gameGrid.textContent = '';
    })
    gameBordState = ['', '', '', '', '', '', '', '', ''];
    grids.forEach((gameGrid) => {
        gameGrid.addEventListener("click", gameGridEvent);
    });
    dialog.showModal();
}

const formSubmitEvent = (e) => {
    e.preventDefault();
    player.X =  document.querySelector('#playerWithX').value;
    player.O =  document.querySelector('#playerWithO').value;
    dialog.close();
}

form.addEventListener("submit", formSubmitEvent);
reset.addEventListener('click', resetEvent);
closebtn.addEventListener("click", (e) => { e.preventDefault(); dialog.close(); })

grids.forEach((gameGrid) => {
    gameGrid.addEventListener("click", gameGridEvent);
});

dialog.showModal();