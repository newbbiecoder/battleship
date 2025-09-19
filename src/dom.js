import INPUTNAMES from "./main/inputName.js";
import "./style.css"

const pvp = document.querySelector('.modes > p:first-child');

pvp.addEventListener('click', () => {
    INPUTNAMES.askPlayersNames()
});