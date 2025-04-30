import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';
const selectPlayer = document.querySelector('.select-player');

const getFieldState = () => {
    const pole = [];
    gameCell.forEach((cell) => {
        if (cell.classList.contains('board_field--circle')) {
            pole.push('o');
        } else if (cell.classList.contains('board_field--cross')) {
            pole.push('x');
        } else {
            pole.push('_');
        }
    }
    );
    return pole;
};

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
    };

    const gameBoard = getFieldState()
    const winner = findWinner(gameBoard)
    if (winner === 'o' || winner === 'x') {
        setTimeout(() => {
            const winnerName = winner === 'o' ? '"O". Kolečko je vítěz' : '"X". Křížek je vítěz';
            alert(`Vyhrál hráč se symbolem ${winnerName}.`);
            location.reload();
        }, 100)
    }
    else if (!gameBoard.includes('_')) {
        setTimeout(() => {
            alert('Hra skončila nerozhodně');
            location.reload();
        }, 100);
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




