const container = document.querySelector('.container');

const player1 = document.createElement('input');
const player2 = document.createElement('input');

function askPlayersNames() {
    container.innerHTML = "";
    
    let heading = document.createElement('div');
    heading.classList.add('heading');
    heading.textContent = "Enter Player Names";
    container.appendChild(heading);

    let askNames = document.createElement('div');
    askNames.classList.add('askNames');
    container.appendChild(askNames);

    player1.type = "text";
    player1.id = "player1";
    player1.placeholder = "PLAYER 1";
    askNames.appendChild(player1);

    player2.type = "text";
    player2.id = "player2";
    player2.placeholder = "PLAYER 2";
    askNames.appendChild(player2);
    
    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('submit');
    
    let span = document.createElement('span');
    span.textContent = "START GAME";
    submit.appendChild(span);
    
    container.appendChild(submit);
}

export default {askPlayersNames, player1, player2}