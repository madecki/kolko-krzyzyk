"use strict";

let player1 = 'O';
let player2 = 'X';
let turn = 1;

let board = [
    '', '', '',
    '', '', '',
    '', '', '',
]

let gameEnabled = true;

const fields = [...document.querySelectorAll('.game-board--field')];
fields.forEach(field => field.addEventListener('click', onFieldClick));

function onFieldClick(event) {
    if (!gameEnabled)
        return;

    if (event.target.querySelector('.game-board--field-content').innerHTML !== '') {
        alert('To pole juz jest zajete!');
        return;
    }

    let selectedPlayer = turn % 2 === 0 ? player1 : player2;

    event.target.querySelector('.game-board--field-content').innerHTML = selectedPlayer;

    board[event.target.dataset.field] = selectedPlayer;
    turn++;

    checkGameStatus(selectedPlayer);
}

function checkGameStatus(selectedPlayer) {
    for (let i = 0; i <= 6; i = i + 3) {
        if (!!board[i] && !!board[i+1] && !!board[i+2]) {
            if (board[i] === board[i+1] && board[i+1] === board[i+2]) {
                endGame(selectedPlayer);
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if (!!board[i] && !!board[i+3] && !!board[i+6]) {
            if (board[i] === board[i+3] && board[i+3] === board[i+6]) {
                endGame(selectedPlayer);
            }
        }
    }

    if (!!board[0] && !!board[4] && !!board[8]) {
        if (board[0] === board[4] && board[4] === board[8]) {
            endGame(selectedPlayer);
        }
    }

    if (!!board[2] && !!board[4] && !!board[6]) {
        if (board[2] === board[4] && board[4] === board[6]) {
            endGame(selectedPlayer);
        }
    }
}

function endGame(selectedPlayer) {
    console.log('Gratulcje, wygrał gracz:', selectedPlayer);
    gameEnabled = false;
}

function resetGameFields() {
    gameEnabled = true;
    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    turn = 1;
    fields.forEach(field => {
        field.querySelector('.game-board--field-content').innerHTML = '';
    });
}

