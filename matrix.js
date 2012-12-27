function Matrix(width, height, grid) {
    this.width  = width;
    this.height = height;
    this.grid   = grid;
    
    var _matrix = new Array(height);
    
    for (var i=0; i<_matrix.length; i++) {
        _matrix[i] = new Array(width);
        for (var j=0; j<_matrix[i].length; j++) {
            _matrix[i][j] = 0;
        }
    }
    
    this.redraw = function () {
        this.grid.clearAll();

        for (var i=0; i<_matrix.length; i++) {
            for (var j=0; j<_matrix[i].length; j++) {
                if (_matrix[i][j] !== 0) {
                    this.grid.fillSquare(j, i, colorMap[_matrix[i][j] - 1]);
                }
            }
        }
    }
    
    this.hasEmpty = function(coordinates) {
        var inMatrix = true;
        var x,y;
        for (var i=0; i<coordinates.length; i++) {
            x = coordinates[i][0];
            y = coordinates[i][1];

            if (!_matrix[y] || _matrix[y][x] !== 0) {
                inMatrix = false;
            }
        }

        return inMatrix;
    }
    
    this.addCoordinates = function(coordinates, index) {
        if (!this.hasEmpty(coordinates)) {
            return;
        }

        var x,y;
        for (var i=0; i<coordinates.length; i++) {
            x = coordinates[i][0];
            y = coordinates[i][1];

            _matrix[y][x] = index;
        }
    }
    
    this.clearLines = function() {
        var tmpScore = 0,
            lineFull,
            linesFull = 0,
            line = 0, j;

        while (_matrix[line]) {
            lineFull = true;
            for (j=0; j<_matrix[line].length; j++) {
                if (_matrix[line][j] === 0)
                    lineFull = false;
            }

            if (lineFull) {
                linesFull++;
                tmpScore += linesFull * 100;
                _matrix.splice(line, 1);
                _matrix.unshift(new Array(width));
                for (j=0; j<_matrix[0].length; j++) {
                    _matrix[0][j] = 0;
                }
            }

            line++;
        }
        
        return tmpScore;
    }
}