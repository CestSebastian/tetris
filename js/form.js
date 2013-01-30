'use strict';

function Form(x, y, grid, formIndex, variationIndex) {
    var forms = [
        // forms
        // the straight
        [
            //variations
            [[-1, 0], [1, 0], [2, 0]],
            [[0, -1], [0, 1], [0, 2]]
        ],
        // the square
        [
            [[0, 1], [1, 1], [1, 0]]
        ],
        // the road bump
        [
            [[-1, 0], [0, -1], [1, 0]],
            [[0, -1], [1, 0], [0, 1]],
            [[1, 0], [0, 1], [-1, 0]],
            [[-1, 0], [0, 1], [0, -1]]
        ],
        // the Z
        [
            [[1, -1], [1, 0], [0, 1]],
            [[-1, 0], [0, 1], [1, 1]]
        ],
        // the NOT Z
        [
            [[0, -1], [1, 0], [1, 1]],
            [[1, 0], [0, 1], [-1, 1]]
        ],
        // right-handed cane
        [
            [[0, -1], [1, -1], [0, 1]],
            [[-1, 0], [1, 0], [1, 1]],
            [[0, -1], [0, 1], [-1, 1]],
            [[-1, -1], [-1, 0], [1, 0]]
        ],
        // left-handed cane
        [
            [[-1, -1], [0, -1], [0, 1]],
            [[-1, 0], [1, 0], [1, -1]],
            [[0, -1], [0, 1], [1, 1]],
            [[-1, 1], [-1, 0], [1, 0]]
        ]
    ];
    
    this.x = x;
    this.y = y;
    this.grid = grid;

    this.formIndex = (formIndex !== undefined ? formIndex : Rss.Random.index(forms));
    
    this.form = forms[this.formIndex];

    this.variationIndex = (variationIndex !== undefined ? variationIndex : Rss.Random.index(this.form));

    this.variation = this.form[this.variationIndex];
    
    this.draw = function() {
        this.grid.fillSquare(this.x, this.y, colorMap[this.formIndex]);

        for (var i=0;i<this.variation.length;i++) {
            this.grid.fillSquare(this.x + this.variation[i][0], this.y + this.variation[i][1], colorMap[this.formIndex]);
        }
    }
    
    this.clear = function() {
        this.grid.clearSquare(this.x, this.y);

        for (var i=0;i<this.variation.length;i++) {
            this.grid.clearSquare(this.x + this.variation[i][0], this.y + this.variation[i][1]);
        }
    }
    
    this.turn = function(matrix) {
        this.clear();

        var prevIndex = this.variationIndex;

        this.variationIndex = (this.variationIndex + 1) % this.form.length;
        this.variation = this.form[this.variationIndex];

        if (!matrix.hasEmpty(this.getCoordinates())) {
            this.variationIndex = prevIndex;
            this.variation = this.form[this.variationIndex];
        }

        this.draw();
    }
    
    this.moveLeft = function(matrix) {
        this.clear();

        this.x--;

        if (!matrix.hasEmpty(this.getCoordinates())) {
            this.x++;
        }

        this.draw();
    }

    this.moveRight = function(matrix) {
        this.clear();

        this.x++;

        if (!matrix.hasEmpty(this.getCoordinates())) {
            this.x--;
        }

        this.draw();
    }

    this.fastStep = function(matrix) {
        this.clear();

        this.y++;

        if (!matrix.hasEmpty(this.getCoordinates())) {
            this.y--;
        }

        this.draw();
    }
    
    this.getCoordinates = function() {
        var coordinates = [];
    
        coordinates.push([this.x, this.y]);

        for (var i=0;i<this.variation.length;i++) {
            coordinates.push([this.x + this.variation[i][0], this.y + this.variation[i][1]]);
        }

        return coordinates;
    }
}