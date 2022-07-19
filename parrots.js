// --------------- Global Scope ---------------
const types = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];

let cardsNumber, pairsLeft, clickedCards, allowCardFlipping, plays, gameplayTime, intervalId;

initGame();

// --------------- Functions ---------------
function initGame() {
    cardsNumber = Number(prompt('Com quantas cartas você deseja jogar?\nEscolha um número par entre 4 e 14'));
    
    while (cardsNumber < 4 || cardsNumber > 14 || cardsNumber % 2 !== 0){
        cardsNumber = Number(prompt('Inválido! Escolha um número par entre 4 e 14'));
    }
    
    pairsLeft = cardsNumber / 2;
    
    clickedCards = [];
    allowCardFlipping = true;
    
    plays = 0;
    
    displayCards();
}

function displayCards() {
    types.sort(comparator);
    const selectedTypes = types.slice(0, cardsNumber/2);
    let cardsArray = [];

    selectedTypes.forEach(type => {
        cardsArray.push(type);
        cardsArray.push(type);
    });

    cardsArray.sort(comparator);

    const table = document.querySelector('.table');
    table.innerHTML = '';
    for (let i in cardsArray) {
        table.innerHTML += `
        <div class="card" data-identifier="card" onclick="flipCard(this)">
            <div class="face back-face" data-identifier="back-face">
                <img src="imagens/front.png">
            </div>
            <div class="face front-face" data-identifier="front-face">
                <img src="imagens/${cardsArray[i]}.gif">
            </div>
        </div>
        `;
    }

    gameplayTime = 0;

    intervalId = setInterval(updateTimer, 1000);
}

function flipCard(card) {
    if (card.classList.contains('selected') || !allowCardFlipping) return;

    card.classList.add('selected');
    clickedCards.push(card);

    plays++;

    if (clickedCards.length === 2) {
        if (clickedCards[0].innerHTML === clickedCards[1].innerHTML) {
            pairsLeft--;
            if (pairsLeft === 0) {
                clearInterval(intervalId);
                setTimeout(endGame, 500);
            }
        } else {
            allowCardFlipping = false;
            setTimeout(unflipCards, 1000, clickedCards);
        }
        clickedCards = [];
    }
}

function unflipCards(cards) {
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    allowCardFlipping = true;
}

function endGame() {
    alert(`Você ganhou em ${plays} jogadas, com ${gameplayTime} segundos de jogo!`);
    playAgain();
}

function playAgain() {
    const play = confirm('Gostaria de jogar novamente?');
    if (play) initGame();
}

function updateTimer() {
    gameplayTime++;
    if (gameplayTime === 9999) {
        clearInterval(intervalId);
        gameplayTime = '+9999';
    }
    document.querySelector('.timer').innerHTML = gameplayTime;
}

function comparator() {
    return Math.random() - 0.5;
}