const buttonColors = ['red', 'blue', 'yellow', 'green'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
function playSound(color) {
    audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}
function animate(color) {
    $('#' + color).fadeOut().fadeIn();
}
function animateWhenClicked(color) {
    $('#' + color).addClass('pressed');
    setTimeout(() => $('#' + color).removeClass('pressed'), 100);
}
function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animate(randomChosenColor);
    playSound(randomChosenColor);
    $('h1').text('Level ' + level);
    return randomChosenColor;
}
function gameOverEffects() {
    $('body').addClass('game-over');
    setTimeout(() => $('body').removeClass('game-over'), 100);
    $('.container').toggleClass('hidden');
    playSound('wrong');
    $('#start-btn').toggleClass('hidden');
    $('h1').text('Game Over, Press restart');
    gamePattern = [];
    i = 0;
    level = 0;
}
if (level == 0) {
    $('.container').toggleClass('hidden');
}
let i = 0;

$('.btn').click(function () {
    userChosenColor = $(this).attr('id');
    if (gamePattern[i] != userChosenColor) {
        gameOverEffects();
        return;
    }
    animateWhenClicked($(this).attr('id'))
    playSound($(this).attr('id'))
    if (i < level) {
        i++;
    } else {
        level++;
        setTimeout(nextSequence, 1000);
        i = 0;
    }
})
$('#start-btn').click(function () {
    $('.container').toggleClass('hidden');
    nextSequence();
    $('h1').text('Level 1');
    $(this).toggleClass('hidden');
})


