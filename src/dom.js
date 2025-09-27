import INPUTNAMES from "./main/inputName.js";
import INPUTCOMPUTERNAME from "./main/inputNameComputer.js";
import { createBoards } from "./main/gameLogic.js";
import { createBoardsComputer } from "./main/gameLogicComputer.js";
import "./style.css"

const pvp = document.querySelector('.modes > p:first-child');
const pvc = document.querySelector('.modes > p:last-child');


pvp.addEventListener('click', () => {
    INPUTNAMES.askPlayersNames();

    const submit = document.querySelector('.submit');

    submit.addEventListener('click', () => {  
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');

        if(player1Input.value.trim().length === 0 || player2Input.value.trim().length === 0) {
            const notification = document.createElement('div');
            notification.textContent = "Enter Both Player Names";
            notification.classList.add('notification');
            document.querySelector('.container').appendChild(notification);
            return;
        }
        
        createBoards();
    })
});


pvc.addEventListener('click', () => {
    INPUTCOMPUTERNAME.askPlayersNames();

    const submit = document.querySelector('.submit');

    submit.addEventListener('click', () => {
        createBoardsComputer();
    })
})