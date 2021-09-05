let score;
let board = new Array();

$(document).ready(function(){
    newGame();
})

function newGame() {
    //初始化棋盘格
    init();
    
    //随机生成两个数字2或4并显示
    generateN();
    generateN();
}

function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let celli = $('#' + i + '-' + j);
            celli.css('top', getTop(i, j));
            celli.css('left', getLeft(i, j));
        }
    }

    //对数组进行初始化
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //对前端进行数字格子的渲染
    updateBoard();

    score = 0;
    changeScore(score);
    
}

function updateBoard() {
    //删掉之前的numberCell效果，对16个格子重新渲染
    $('.numbercell').remove();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('#big-grid').append('<div class="numbercell" id="nc-' + i + '-'+j+'"></div>');
            let theNC = $('#nc-' + i + '-' + j);
            //当该格子的数字是0时，不要显示数字
            if (board[i][j] == 0) {
                theNC.css('width', 0);
                theNC.css('height', 0);
                theNC.css('top', getTop(i, j) + 50);
                theNC.css('left', getLeft(i, j) + 50);
            } else {//当格子的数字不为0时，显示Number Cell,覆盖掉原来的格子
                theNC.css('width', 100);
                theNC.css('height', 100);
                theNC.css('top', getTop(i, j));
                theNC.css('left', getLeft(i, j));
                theNC.css('color', getNumberColor(board[i][j]));//数字呈现的颜色
                theNC.css('background-color', getNCbgColor(board[i][j]));//不同数字格子的背景颜色
                theNC.text(board[i][j]);
            }//设置长宽，以及相对边界的左、上距离，和数字颜色、格子背景颜色

        }
    }
}

function generateN() {
    if (isFull(board)) return false;
    //随机生成一个数字
    let num =  Math.random() < 0.5 ? 2 : 4;

    //随机生成一个位置
    let ranx = parseInt(Math.floor(Math.random() * 4));
    let rany = parseInt(Math.floor(Math.random() * 4));
    let time = 0;
    //随机生成位置，直到该位置原本没有数字
    while (time < 50) {
        if (board[ranx][rany] === 0) {
            console.log(ranx, rany);
            break;
        } else {
            ranx = parseInt(Math.floor(Math.random() * 4));
            rany = parseInt(Math.floor(Math.random() * 4));
        }
        time++;
    }
    if (time == 50) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                ranx = i;
                rany = j;
            }
        }
    }
    board[ranx][rany] = num;

    //把数字放到那个位置中
    showNumberWithAnimation(ranx, rany, num);


    return true;
}

/**
 * 该函数将一个函数绑定到用户按键
 */
$(document).keydown(function (event) {
    switch(event.keyCode) {
        case 37: 
            if (moveLeft()) {
                setTimeout('generateN()', 210);
                setTimeout('isGameOver()',520);
            }
            break;
        case 38:
            if (moveUp()) {
                setTimeout('generateN()', 210);
                setTimeout('isGameOver()',520);
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout('generateN()', 210);
                setTimeout('isGameOver()',520);
            }
            break;
        case 40:
            if (moveDown()) {
                setTimeout('generateN()', 210);
                setTimeout('isGameOver()',520);
            }
            break;
        default: break;            
    }
});

/**
 * 该函数判断是否游戏结束，如果结束，执行结束操作
 */
function isGameOver() {
    if (isFull(board) && noMove(board)) {
        GameOver();
    }
}

function GameOver() {
    alert('Game over! Your score:' + score);
}


function moveLeft() {
    if (!canMoveLeft(board)) return false;

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlock(i, j, board, k)) {
                       //move
                       showMoveAnimation(i, j, i, k);
                       //update the board
                       board[i][k] = board[i][j];
                       board[i][j] = 0;
                       break;
                    } else if (board[i][k] === board[i][j] && noBlock(i, j, board, k)) {
                        //move;
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];
                        changeScore(score);
                        break;
                   }
                }
            }
            
        }
    }
    setTimeout('updateBoard()', 200);
    return true;
}


function moveRight() {
    if (!canMoveRight(board)) return false;
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (k = 3; k > j; k--) {
                   if (board[i][k] === 0 && noBlock(i, k, board, j)) {
                       //move
                       showMoveAnimation(i, j, i, k);
                       //update the board
                       board[i][k] = board[i][j];
                       board[i][j] = 0;

                   } else if (board[i][k] === board[i][j] && noBlock(i, k, board, j)) {
                        //move;
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];
                        changeScore(score);
                   }
                }
            }
            
        }
    }
    setTimeout('updateBoard()', 200);
    return true;
    
}

function moveUp() {
    if (!canMoveUp(board)) return false;

    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockUD(i, j, board, k)) {
                       //move
                       showMoveAnimation(i, j, k, j);
                       //update the board
                       board[k][j] = board[i][j];
                       board[i][j] = 0;
                       break;
                    } else if (board[k][j] === board[i][j] && noBlockUD(i, j, board, k)) {
                        //move;
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        changeScore(score);
                        break;
                   }
                }
            }
            
        }
    }
    setTimeout('updateBoard()', 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) return false;

    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockUD(k, j, board, i)) {
                       //move
                       showMoveAnimation(i, j, k, j);
                       //update the board
                       board[k][j] = board[i][j];
                       board[i][j] = 0;
                    } else if (board[k][j] === board[i][j] && noBlockUD(k, j, board, i)) {
                        //move;
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        changeScore(score);
                   }
                }
            }
            
        }
    }
    setTimeout('updateBoard()', 200);
    return true;
}