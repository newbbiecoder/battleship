import INPUTNAMES from "./main/inputName.js";
import { createBoards } from "./main/gameLogic.js";
import "./style.css"

const pvp = document.querySelector('.modes > p:first-child');


pvp.addEventListener('click', () => {
    INPUTNAMES.askPlayersNames();

    const submit = document.querySelector('.submit');

    submit.addEventListener('click', () => {       
        createBoards();
    })
});


