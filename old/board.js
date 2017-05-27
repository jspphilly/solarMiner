function generateBoard() {

    //CONSTANTS
    const row = 9;
    const col = 7;

    //GAME VARIABLES
    var pieceWidth = 0;
    var pieceHeight = 0;
    var boardSpaces = [];
    var grid = [];


    var board = document.querySelector('board-space');
    var hud = document.querySelector('hud-display');
    var boardDimensions = board.getBoundingClientRect();
    var width = ~~boardDimensions.width;
    pieceWidth = width / col;
    var height = ~~boardDimensions.height;
    pieceHeight = height / row;



    //Create Random Grid
    for (var i = 0; i < row; i++) {
        var pieceRow = []
        for (var j = 0; j < col; j++) {

            var valid = false;
            var validNum;
            while (!valid) {
                var val = Math.round(Math.random() * 5);
                if (checkTwoUp(i, j, val) && checkTwoLeft(j, val)) {
                    valid = true;
                    validNum = val;
                }
            }
            pieceRow.push(validNum);
        }
        grid.push(pieceRow);
    }

    //Loop through the grid and create elements
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var pieceType = grid[i][j];
            var newStar = createStar(pieceType)

            var gamePiece = document.createElement('piece-star')
            gamePiece.style.height = pieceHeight;
            gamePiece.style.width = pieceWidth;
            gamePiece.style.top = i * pieceHeight;
            gamePiece.style.left = j * pieceWidth;
            gamePiece.attributes.xCoordinate = j;
            gamePiece.attributes.yCoordinate = i;
            gamePiece.addEventListener('mousedown', function(event) {
                console.log('mousedown')
                dragStartStarPiece(event);
            })
            gamePiece.addEventListener("mouseup", function(event) {
                console.log('mouseup')
                dragEndStarPiece(event);
            })


            gamePiece.style.backgroundColor = newStar._type.color;

            board.appendChild(gamePiece)
        }

    }


    function createStar(type, value) {
        return new starPiece(type, value);
    }

    function checkTwoUp(x, y, value) {
        var returnObj = true;

        if (x - 2 >= 0) {
            var twoFrom = grid[x - 2][y];
            var oneFrom = grid[x - 1][y];

            if (oneFrom == twoFrom) {
                if (twoFrom == value) {
                    returnObj = false;
                }
            }
        }
        return returnObj;
    }

    function checkTwoLeft(x, value) {
        var returnObj = true;

        if (x - 2 >= 0) {
            var twoFrom = pieceRow[x - 2];
            var oneFrom = pieceRow[x - 1];

            if (oneFrom == twoFrom) {
                if (twoFrom == value) {
                    returnObj = false;
                }
            }
        }
        return returnObj;
    }



    function dragStartStarPiece($event) {
        $event.target.attributes.initialY = $event.clientY;
        $event.target.attributes.initialX = $event.clientX;

        hud.innerHTML = "<h1>Starting Drag</h1>"
    }

    function dragEndStarPiece($event) {
        var startX = $event.target.attributes.initialX;
        var startY = $event.target.attributes.initialY;
        var endX = $event.clientX;
        var endY = $event.clientY;

        var diffX = startX - endX;
        var diffY = startY - endY;
        var absDiffX = Math.abs(diffX)
        var absDiffY = Math.abs(diffY)

        var yCord = $event.target.attributes.yCoordinate;
        var xCord = $event.target.attributes.xCoordinate;

        if (absDiffX > absDiffY && diffX > 0) {
            hud.innerHTML = "<h1>LEFT</h1>"
            moveLeft(yCord, xCord, $event.target)
        }

        if (absDiffX > absDiffY && diffX < 0) {
            hud.innerHTML = "<h1>RIGHT</h1>"
            moveRight(yCord, xCord, $event.target)
        }

        if (absDiffX < absDiffY && diffY > 0) {
            hud.innerHTML = "<h1>UP</h1>"
            moveUp(yCord, xCord, $event.target)
        }

        if (absDiffX < absDiffY && diffY < 0) {
            hud.innerHTML = "<h1>DOWN</h1>"
            moveDown(yCord, xCord, $event.target)
        }
    }
    //MOVEMENT
    function moveLeft(y, x, piece) {
        var val1 = grid[y][x]
        var val2 = grid[y][x - 1]

        if (isValidMove(val1, val2)) {
            var temp = val2;
            grid[y][x - 1] = val1
            grid[y][x] = temp;

            //MOVE GAME PIECE
            var left = String((parseInt(piece.style.left) - pieceWidth) + 'px');
            piece.style.left = left;
        } else {
            invalidMove();
        }
    }

    function moveRight(y, x, piece) {
        var val1 = grid[y][x]
        var val2 = grid[y][x + 1]

        if (isValidMove(val1, val2)) {
            var temp = val2;
            grid[y][x + 1] = val1
            grid[y][x] = temp;

            //MOVE GAME PIECE
            var right = String((parseInt(piece.style.left) + pieceWidth) + 'px');
            piece.style.left = right;
        } else {
            invalidMove();
        }
    }

    function moveUp(y, x, piece) {
        var val1 = grid[y][x]
        var val2 = grid[y - 1][x]

        if (isValidMove(val1, val2)) {
            var temp = val2;
            grid[y - 1][x] = val1
            grid[y][x] = temp;

            //MOVE GAME PIECE
            var top = String((parseInt(piece.style.top) - pieceHeight) + 'px');
            piece.style.top = top;
        } else {
            invalidMove();
        }
    }

    function moveDown(y, x, piece) {
        var val1 = grid[y][x]
        var val2 = grid[y + 1][x]

        if (isValidMove(val1, val2)) {
            var temp = val2;
            grid[y + 1][x] = val1
            grid[y][x] = temp;

            //MOVE GAME PIECE
            var top = String((parseInt(piece.style.top) + pieceHeight) + 'px');
            piece.style.top = top;
        } else {
            invalidMove();
        }
    }

    function isValidMove(val1, val2) {
        return val1 != val2;
    }

    function invalidMove() {
        hud.innerHTML = "<h1>Sorry! That's not a valid move</h1>"
    }

}