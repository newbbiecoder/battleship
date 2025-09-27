const container = document.querySelector('.container');

const player = document.createElement('input');

function askPlayersNames() {
    container.innerHTML = "";
    
    let heading = document.createElement('div');
    heading.classList.add('heading');
    heading.textContent = "Enter Player Name";
    container.appendChild(heading);

    let askNames = document.createElement('div');
    askNames.classList.add('askNames');
    container.appendChild(askNames);

    player.type = "text";
    player.id = "player";
    player.placeholder = "PLAYER";
    askNames.appendChild(player);

    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.classList.add('submit');

    let span = document.createElement('span');
    span.textContent = "START GAME";
    submit.appendChild(span);

    container.appendChild(submit);
}

export default {askPlayersNames, player};