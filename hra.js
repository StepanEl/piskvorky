
let currentPlayer = 'circle';
const selectPlayer = document.querySelector('.select-player');

const selectItem = (event) => {
    if (currentPlayer === 'circle') {
        event.target.classList.add('board_field--circle');
        currentPlayer = 'cross';
        selectPlayer.classList.remove('circle');
        selectPlayer.classList.add('cross');
        event.target.disabled = true;
    } else {
        event.target.classList.add('board_field--cross');
        currentPlayer = 'circle';
        selectPlayer.classList.remove('cross');
        selectPlayer.classList.add('circle');
        event.target.disabled = true;
    }
};

const gameCell = document.querySelectorAll('.game-cell');
gameCell.forEach((cell) => {
    cell.addEventListener('click', selectItem);
})


const restartElement = document.querySelector('.restart')
restartElement.addEventListener('click', (event) => {
    const askRestart = confirm('Opravdu chceš začít znova?');
    if (askRestart === false) {
        event.preventDefault();
    }
});