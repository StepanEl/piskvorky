import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

const selectPlayer = document.querySelector('.select-player');
const gameCell = document.querySelectorAll('.game-cell');
const restartElement = document.querySelector('.restart')

//vytvoření pole - načtení všech políček
const getFieldState = () => {
    const fieldArray = [];
    gameCell.forEach((cell) => {
        if (cell.classList.contains('board_field--circle')) {
            fieldArray.push('o');
        } else if (cell.classList.contains('board_field--cross')) {
            fieldArray.push('x');
        } else {
            fieldArray.push('_');
        }
    }
    );
    return fieldArray;
};

//kontrola výhry
const checkGameState = () => {
    const gameBoard = getFieldState()
    const winner = findWinner(gameBoard)
    if (winner === 'o' || winner === 'x') {
        setTimeout(() => {
            const winnerName = winner === 'o' ? '"O". Kolečko je vítěz' : '"X". Křížek zvítězil';
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

//Připojení AI hráče
const suggestNextMove = async () => {
    const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            board: getFieldState(),
            player: 'x',
        }),
    })
    const data = await response.json();
    const { x, y } = data.position
    const field = gameCell[x + y * 10]
    field.click()

    checkGameState()
};

//Výběr hráče
const selectItem = (event) => {
    if (
        event.target.classList.contains('board_field--circle')
        ||
        event.target.classList.contains('board_field--cross')
    ) {
        return;
    }

    if (currentPlayer === 'circle') {
        event.target.classList.add('board_field--circle');
        event.target.disabled = true;
        currentPlayer = 'cross';
        selectPlayer.classList.remove('circle');
        selectPlayer.classList.add('cross');

        checkGameState()

        if (currentPlayer === 'cross') {
            suggestNextMove()
        }
    } else {
        event.target.classList.add('board_field--cross');
        event.target.disabled = true;
        currentPlayer = 'circle';
        selectPlayer.classList.remove('cross');
        selectPlayer.classList.add('circle');
    }
};

//Posluchač události při kliknutí
gameCell.forEach((cell) => {
    cell.addEventListener('click', selectItem);
});



//Restart hry
restartElement.addEventListener('click', (event) => {
    const askRestart = confirm('Opravdu chceš začít znova?');
    if (askRestart === false) {
        event.preventDefault();
    }
});




