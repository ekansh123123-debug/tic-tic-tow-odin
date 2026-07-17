const allGameGrid = document.querySelectorAll(".gameGrid");
const reset = document.querySelector("#reset");
const upperBox = document.querySelector("#upperBox"); 
let gameBordState = ['','O','X','X','O','','','',''];

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  //row
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  //coloume
    [0, 4, 8], [2, 4, 6]              //diagonal
    ];

const gameWinAlert = (char) => {
    const winMassage = document.createElement("div");
    winMassage.textContent = `Player with ${char} has won 🫡`;
    upperBox.appendChild(winMassage);
}

const gameWinCheck = (board) => {
    for(const combination of winningCombination){
        const [a,b,c] = combination;
        if(board[a] && board[a]==board[b] && board[a]==board[c]){
            gameWinAlert(board[a]);
            return;
        }
    }
    if(board.filter(String).length === 9) {
        const drawMassage = document.createElement("div");
        drawMassage.textContent = "The game was a draw . well played 👍";
        upperBox.appendChild(drawMassage);
        return;
    }
    return;
}

const changeTern = (function () {
    let choise = 0;

    function getChoise () {
        if((choise++) % 2 === 0) return 'O';
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
    allGameGrid.forEach((gameGrid) => {
        gameGrid.textContent = '';
    })
    gameBordState = ['','','','','','','','',''];
}

reset.addEventListener('click',resetEvent);

allGameGrid.forEach((gameGrid) => {
    gameGrid.addEventListener("click",gameGridEvent);
});