import { Player } from "../constants/GameConstants";

let isGameOver = false;
export const GameOverHelper = () => {
    let divElement = document.createElement('div');
    divElement.classList.add('gameOverArea')
    divElement.innerHTML = '<h2>Game Over</h2><h3>'+Player.score+' points</h3>';
    document.body.appendChild(divElement);
    isGameOver = true;
}

export const GetGameOverStatus = (): boolean => {
    return isGameOver
}