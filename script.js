let gameBordState = [,'O','X','X','O',];

const gameWinCheck = () => {
    
}

const gameChoise = (function () {
    let choise = 0;

    function getChoise () {
        if((choise++) % 2 === 0) return 'O';
        return 'X';
    }
    return getChoise;
})();

const gameGridEvent = (e) => {
    const currentGrid = e.currentTarget;

    if (currentGrid.textContent){
        return;
    }

    const currentGridChoise = gameChoise(); 
    currentGrid.textContent = currentGridChoise;
    const index = parseInt(currentGrid.id);
    gameBordState[index] = currentGridChoise;
}


const resetEvent = () => {
    allGameGrid.forEach((gameGrid) => {
        gameGrid.textContent = '';
    })
    gameBordState = [];
}


const allGameGrid = document.querySelectorAll(".gameGrid");
const reset = document.querySelector("#reset");

reset.addEventListener('click',resetEvent);

allGameGrid.forEach((gameGrid) => {
    gameGrid.addEventListener("click",gameGridEvent);
});

