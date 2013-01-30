'use strict';

var tetris,
    startButton      = document.getElementById('start'),
    pauseButton      = document.getElementById('pause'),
    gameElement      = document.getElementById('game'),
    scoreElement     = document.getElementById('score'),
    nextPieceElement = document.getElementById('nextPiece');

startButton.addEventListener('click', function() {
    var canvasElem = document.getElementById('canvas');

    if (canvasElem)
        gameElement.removeChild(canvasElem);

    var nextPieceCanvasElement = document.getElementById('nextPieceCanvas');

    if (nextPieceCanvasElement)
        nextPieceElement.removeChild(nextPieceCanvasElement);

    if (tetris)
        tetris.destroy();

    scoreElement.style.display = 'block';
    nextPieceElement.style.display = 'block';

    tetris = new Tetris(gameElement, scoreElement, nextPieceElement);
    tetris.play();

    pauseButton.removeAttribute('disabled');
});

pauseButton.addEventListener('click', function() {
    tetris.pause();
});