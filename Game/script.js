// SELECTORS

const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $timeChanger = document.querySelector('#time_changer');

const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'purple', 'darkred', 'black', 'brown'];
let score = 0;


// EVENT LISTENERS

$start.addEventListener('click', startGameFunc);
$timeChanger.addEventListener('change', changeTimeFunc);
$game.addEventListener('click', clickHandlerFunc);


// FUNCTIONS

function startGameFunc(){
    hide($start);
    $game.style.backgroundColor = 'white';

    score=0;
    $result.textContent = score;

    const interval = setInterval(()=>{
        let time = +$time.textContent;

        if(time === 0){
            clearInterval(interval);
            endGameFunc();
        }
        else {
            $time.textContent = (time-0.1).toFixed(1);
        }

    }, 100);

    renderBox();
}


function endGameFunc(){
    show($start);
    $game.style.backgroundColor = 'gray';
    $time.textContent = (+$timeChanger.value).toFixed(1);
    $game.textContent = '';
}


function renderBox(){

    const index = random(0, colors.length-1);
    const boxSize = random(30, 100);            // 50
    const gameSize = $game.getBoundingClientRect().width;    // {width: 300, hedith: 300, top, left}
    const boxTop = random(0, gameSize - boxSize);    // 0-250
    const boxLeft = random(0, gameSize - boxSize);   // 0-250

    $box = document.createElement('div');
    $box.style.width = boxSize + 'px';
    $box.style.height = boxSize + 'px';
    $box.style.backgroundColor = colors[index];
    $box.style.position = 'absolute';
    $box.style.top = boxTop + 'px';
    $box.style.left = boxLeft + 'px';
    $box.style.cursor = 'pointer';
    $box.setAttribute('data-box', 'true');

    $game.append($box);
}


function changeTimeFunc(){
    $time.textContent =  (+$timeChanger.value).toFixed(1);
}


function clickHandlerFunc(e){
    if(e.target.dataset.box){
        
        score++;
        $result.textContent = score;

        $game.textContent = '';
        renderBox();
    }
}



function hide($el){
    $el.classList.add('hide');
}


function show($el){
    $el.classList.remove('hide');
}

function random(min, max){
    return Math.floor( Math.random()*(max-min+1) + min );
}

