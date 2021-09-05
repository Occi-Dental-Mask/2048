function getTop(i, j) {
    return 120 * i + 20;
}

function getLeft(i, j) {
    return 120 * j + 20;
}

/**
 * 该函数返回一个css颜色属性，代表数字呈现的颜色
 * @param {*} num 
 */
function getNumberColor(num) {
    if (num <= 4) return 'brown';
    return 'white';
}

/**
 * 该函数返回一个css颜色属性，代表不同的数字呈现不同的背景颜色
 * @param {*} num 
 */
function getNCbgColor(num) {
    switch(num) {
        case 2: return '#eee4da';break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f3b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f';break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#a6c'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;

    }
    return 'black';
}



/**
 * 该函数判断数组是否全满了
 */
function isFull(board) {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

/**
 * 该函数判断当前游戏局势能否向左移动
 */
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] === 0 || board[i][j] === board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 该函数判断当前游戏局势能否向右移动
 */
 function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] === 0 || board[i][j] === board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 该函数判断当前游戏局势能否向上移动
 */
function canMoveUp(board) {
    for (let i = 1; i < 4; i ++) {
        for (let j = 0; j < 4; j ++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] === 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;

}

/**
 * 该函数判断当前游戏局势能否向下移动
 */
 function canMoveDown(board) {
    for (let i = 0; i < 3; i ++) {
        for (let j = 0; j < 4; j ++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] === 0 || board[i][j] == board[i + 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;

}

/**
 * 该函数判断，在第i行，第j列的元素能否向左移动到第k列/向右移动到第k列
 */
function noBlock (i, j, board, k) {
    let row = board[i];
    for (let index = k + 1; index < j; index++) {
        if (row[index] != 0) return false;
    }
    return true;
}

/**
 * 
 * 该函数管的是垂直部分的上下移动是否有障碍物
 */
function noBlockUD(i, j, board, k) {
    let column = new Array();
    for (let index = 0; index < 4; index++) {
        column.push(board[index][j]);
    }
    for (let index = k + 1; index < i; index++) {
        if (column[index] != 0) return false;
    }
    return true;
}



/**
 * 该函数判断是否能够移动
 */
 function noMove(board) {
    if (canMoveDown(board) || canMoveLeft(board) || canMoveUp(board) || canMoveRight(board)) {
        return false;
     }
    return true;
}