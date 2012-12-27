var Rss = {};

Rss.Random = {};

Rss.Random.index = function(array) {
    return Math.floor(Math.random() * array.length);
}

Rss.Random.choice = function(array) {
    return array[Rss.Random.index(array.length)];
}

Rss.Canvas = function(appendTo, canvasId) {
    if (!appendTo) appendTo = document.body;
    if (!canvasId) canvasId = 'canvas';
    
    var _canvas = document.createElement('canvas');
    _canvas.setAttribute('id', canvasId);
    
    appendTo.appendChild(_canvas);
    
    this.getCanvas = function() {
        return _canvas;
    }
    
    this.getContext2d = function() {
        return _canvas.getContext('2d');
    }
    
    this.makeGrid = function(x, y, squareSize) {
        
    }
}

Rss.Grid = function(x, y, squareSize, hasBorder, borderColor, appendTo, canvasId) {
    this.x = x;
    this.y = y;
    this.squareSize = squareSize;
    this.borderSize = hasBorder ? 1 : 0;
    
    var rssCanvas = new Rss.Canvas(appendTo, canvasId);
    
    var canvasWidth     = x * squareSize + this.borderSize;
    var canvasHeight    = y * squareSize + this.borderSize;

    rssCanvas.getCanvas().setAttribute('width', canvasWidth);
    rssCanvas.getCanvas().setAttribute('height', canvasHeight);

    var context = rssCanvas.getContext2d();
    
    var _makeGrid = function() {
        for (var x = 0; x <= canvasWidth; x += squareSize) {
            context.moveTo(x + 0.5, 0);
            context.lineTo(x + 0.5, canvasHeight);
        }

        for (var x = 1; x <= canvasHeight; x += squareSize) {
            context.moveTo(0, x - 0.5);
            context.lineTo(canvasWidth, x - 0.5);
        }

        if (borderColor) {
            context.strokeStyle = borderColor;
            context.stroke();
        }
    }
    
    this.getRssCanvas = function() {
        return rssCanvas;
    }
    
    this.fillSquare = function(x, y, fillStyle) {
        context.fillStyle = fillStyle;
        if (x <= this.x && y <= this.y && x >=0 && y >= 0)
            context.fillRect(x * this.squareSize + this.borderSize, y * this.squareSize + this.borderSize, this.squareSize - this.borderSize, this.squareSize - this.borderSize);
    }
    
    this.clearSquare = function(x, y) {
        if (x <= this.x && y <= this.y && x >=0 && y >= 0)
            context.clearRect(x * this.squareSize + this.borderSize, y * this.squareSize + this.borderSize, this.squareSize - this.borderSize, this.squareSize - this.borderSize);
    }
    
    this.clearAll = function() {
        context.clearRect ( 0 , 0 , canvasWidth , canvasHeight );
        
        if (hasBorder)
            _makeGrid();
    }
    
    if (hasBorder)
        _makeGrid();
}