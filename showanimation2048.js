function showNumberWithAnimation(i, j, num) {
    let theOne = $('#nc-' + i + '-' + j);
    theOne.text(num);
    theOne.css('color', getNumberColor(num));
    theOne.css('background-color', getNCbgColor(num));
    theOne.animate({
        width:'100px',
        height: '100px',
        top: getTop(i, j),
        left: getLeft(i, j)
    }, 300);
    
}

/**
 * 该函数设置一个动画，显示从某个数字格子到另一个数字格子的移动过程
 */
function showMoveAnimation(fromX, fromY, toX, toY) {
    let before = $('#nc-' + fromX + '-' + fromY);
    before.animate({
        top: getTop(toX, toY),
        left: getLeft(toX, toY)
    }, 200);

}


/**
 * 该函数改变score在前台显示的值
 */
function changeScore(score) {
    let ele = $('#score');
    ele.text(score);
}