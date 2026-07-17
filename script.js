let gameBordState = [];

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

}
const resetEvent = () => {
    allGameGrid.forEach((gameGrid) => {
        gameGrid.textContent = '';
    })
}


const allGameGrid = document.querySelectorAll(".gameGrid");
const reset = document.querySelector("#reset");

reset.addEventListener('click',resetEvent);
allGameGrid.forEach((gameGrid) => {
    gameGrid.addEventListener("click",gameGridEvent);
});

