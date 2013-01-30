'use strict';

function Tetris(gameContainer, scoreContainer, nextPieceContainer) {
    var width = 10,
        height = 20,
        keyMap = {
            32 : 'SPACE',
            37 : 'LEFT',
            38 : 'UP',
            39 : 'RIGHT',
            40 : 'DOWN'
        },
        grid = new Rss.Grid(width, height, 20, true, '#FFF', gameContainer),
        nextGrid = new Rss.Grid(5, 5, 20, true, '#FFF', nextPieceContainer, 'nextPieceCanvas'),
        matrix = new Matrix(width, height, grid),
        currentForm,
        nextForm,
        gameSpeed = 1, // 1 - 5
        frameCount = 0,
        score = 0,
        intervalId,
        self = this;
    
    var _keyListener = function(event) {
        switch (keyMap[event.keyCode]) {
            case 'SPACE':
                self.pause();
                break;
            case 'UP' :
                currentForm.turn(matrix);
                break;
            case 'LEFT' :
                currentForm.moveLeft(matrix);
                break;
            case 'RIGHT' :
                currentForm.moveRight(matrix);
                break;
            case 'DOWN' :
                currentForm.fastStep(matrix);
                break;
            default :
                break;
        }
    }
    
    var _initKeyListener = function() {
        document.addEventListener('keydown', _keyListener);
    }
    
    function frame() {
        frameCount++;
        
        if (frameCount % 3000 === 0 && gameSpeed < 5) {
            gameSpeed++;
            console.log('Game speed increased to:', gameSpeed);
        }
        
        if (frameCount % ((6 - gameSpeed) * 3) === 0) {
            currentForm.clear();

            currentForm.y++;
            if (matrix.hasEmpty(currentForm.getCoordinates())) {
                currentForm.draw();
            } else if (currentForm.y == 1 ) {
                currentForm.y--;
                currentForm.draw();
                clearInterval(intervalId);
                alert('Game Over, Total score: ' + score);
            } else {
                currentForm.y--;
                matrix.addCoordinates(currentForm.getCoordinates(), currentForm.formIndex + 1);
                score += matrix.clearLines();
                scoreContainer.querySelector('p').textContent = score;
                matrix.redraw();
                currentForm = new Form(4, 0, grid, nextForm.formIndex, nextForm.variationIndex);
                nextForm.clear();
                nextForm = new Form(2, 2, nextGrid);
                nextForm.draw();
            }
        }
    }
    
    this.play = function() {
        scoreContainer.querySelector('p').textContent = score;
        
        currentForm = new Form(4, 0, grid);
        currentForm.draw();
        
        nextForm = new Form(2, 2, nextGrid);
        nextForm.draw();
        
        _initKeyListener();
        
        intervalId = setInterval(frame, 33);
    }
    
    this.pause = function() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            pauseButton.textContent = 'Unpause (Space)';
        } else {
            intervalId = setInterval(frame, 33);
            pauseButton.textContent = 'Pause (Space)';
        }
    }
    
    this.destroy = function() {
        if (intervalId)
            clearInterval(intervalId);
        
        document.removeEventListener('keydown', _keyListener);
    }
}