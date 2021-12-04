let $start = document.querySelector('#start');   //перемення кнопки старт
let $game = document.querySelector('#game');    //переменная div который перемещается
let $result = document.querySelector('#result');  
let score = 0;  //хранит количество нажатий на квадрат
let $time = document.querySelector('#time');  //переменная времени таймера
let isGameStart = false;
let $timeHeader = document.querySelector('#time-header');  //время
let $resultHeadr = document.querySelector('#result-header'); //переменная результата
let $gameTime = document.querySelector('#game-time'); //время игры из инпута

$start.addEventListener('click', startGame);
$game.addEventListener('click', hendelBoxClick);
$gameTime.addEventListener('input',setGameTime); //прослушака inputa и установка в него времени   

function show($el){
    $el.classList.remove('hide'); //показываем элемент
}
function hide($el){
    $el.classList.add('hide'); //скрываем  элемент
}

function startGame(){    
    score = 0;
    setGameTime(); //вызываем функцию времени
    $gameTime.setAttribute('disabled', 'true'); // делаем невозможным изменение 
    //времени во время игры s   
    show($timeHeader); //показываем timeHeder   
    hide($resultHeadr);    // resultHeader скрываем

    isGameStart = true;  
    $game.style.backgroundColor = '#fff'; // красим игровое поле в белый цвет
    hide($start); //делаем кнопку старт невидимой после нажатия
    
    let interval = setInterval(function(){ //функция установки времени  
        let time = parseFloat($time.textContent);  //преобразовываем в число строку в поле (это наша цифра 5 мин)
        //console.log('interval', $time.textContent)
        //если время закончилось завершаем игру
        // иначе уменьшаем время на 100мс
        if(time <= 0){  
            clearInterval(interval); //очищаем интервал чтобы завершение работы таймера 
            //было с завершением игры//end game
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1); //выводим 1 знак после ,
        }
    },100);
    renderBox();
}

//подсчет результата
function setGameScore(){
    $result.textContent = score.toString();
}
//функция установки времени таймера
function setGameTime(){
    let time = +$gameTime.value;  //устанавливаем время по значению поля
    $time.textContent = time.toFixed(1); //устанавливаем время 5сек
    show($timeHeader); //показываем timeHeder   
    hide($resultHeadr);    // resultHeader скрываем
}

function endGame(){
    isGameStart = false;
    setGameScore(); // вызываем функцию подсчета результа
    $gameTime.removeAttribute('disabled'); 
    show($start)      //убираем свойство невидимости квадрата
    $game.innerHTML = '';                 //убираем квадрат с поля
    $game.style.backgroundColor = '#ccc';  //делаем цвет поля серым
   // $game.style.borderRadius = '50%'; 
    hide($timeHeader);     // скрываем время в конце игры 
    show($resultHeadr);  //убираем скрытие результата
}   

//функция отслеживания клика по квадрату 
function hendelBoxClick(event){
    if(!isGameStart){
        return;
    }
    if(event.target.dataset.box){  // если в поле присутствует элемент ключ box
        score++;  //подсет количества нажатий
        renderBox(); 
    }
}
//функция создания квадратов
function renderBox(){
    $game.innerHTML ='';  // удаляем квадрат после отработки
    let box = document.createElement('div'); // создаем элемент div
    let boxSize = getRandom(30,100);    
    let gameSize = $game.getBoundingClientRect();   //вовращает размер игрового поля. Div
    let maxTop = gameSize.height - boxSize;  //максимально перемещение квадрата с учетом поля 
    // и самого квадрата с верху и с лева. Используя поля метода высше
    let maxLeft = gameSize.width - boxSize;
    
    box.style.height = box.style.width = boxSize + 'px';  //ширина и высота квадрата
    box.style.position = 'absolute';        
   // box.style.borderRadius = '50%';      
    //положение квадрата рандомно в рамках поля
    box.style.top = getRandom(0, maxTop) + 'px' ; // расположение квадрата
    box.style.left = getRandom(0, maxLeft) + 'px'; 
    box.style.cursor = 'pointer';   // стиль можно нажимать

    box.style.backgroundColor = randomColor();       // цвет квадрата в поле
    
    box.setAttribute('data-box', 'true');        //присваиваем атрибут квадрату в поле
    $game.insertAdjacentElement('afterbegin', box);
}

//функция генерации чисел в заданном диапазоне для размера квадрата
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min); 
}
//функция генерации случайного цвета
// вовзращаем округленное в меньшую сторону случайное число, умноженное на кол
// цветов, приводим к стоковому типу
function randomColor(){
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}