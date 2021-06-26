let mapArray, ctx, currentImgMain;
let imgcookie, imgtrunk, imghome, imgMain;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 200;

//網頁載入完成後初始化動作
$(function () {
    mapArray = [
        //0-可走,1-骨頭,2-終點,3-餅乾
        [3, 0, 0, 2],
        [0, 0, 1, 0]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    

    var currentX = 102;
    imgMain = new Image();
    imgMain.src = "RPG/images/pic.png";
    currentImgMain = {
        "x": 0,
        "y": 200
    };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 102, 218, 440, 300, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }
    imgtrunk = new Image();
    imgtrunk.src = "RPG/images/bone.png";
    imgtrunk.onload = function () {
        ctx.drawImage(imgtrunk, 2 * gridLength, gridLength, gridLength, gridLength);
    }

    imghome = new Image();
    imghome.src = "RPG/images/home.png";
    imghome.onload = function () {
        ctx.drawImage(imghome, 3 * gridLength, 0, 200, 200);
    }
    imgcookie = new Image();
    imgcookie.src = "RPG/images/cookies.png";
    imgcookie.onload = function () {
        ctx.drawImage(imgcookie, 0, 0, gridLength, gridLength);
    }
    //TODO-Improve : 能不能夠處理多個onload的問題
});
//處理使用者按下按鍵
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    }
    event.preventDefault();
    //console.log(event);
    switch (event.key) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 658;
            currentX = cutImagePositionX;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = currentX;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 102;
            currentX = cutImagePositionX;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = currentX;
            break;

        default:
            return;
    }

    if (targetImg.x <= 600 && targetImg.x >= 0 && targetImg.y <= 200 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0://一般道路
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1://有骨頭
                $("#talkBox").text("不可以啃骨頭\/");
                break;
            case 2://終點
                $("#talkBox").text("你終於回家了...");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3://餅乾
                $("#talkBox").text("不回家不能吃餅乾\/");
                break;
        }

    } else {
        $("#talkBox").text("不能走那裏!!!")
    }

    //重新繪製主角
    //看有沒有轉頭
    ctx.drawImage(imgMain, cutImagePositionX, 218, 440, 300, currentImgMain.x,currentImgMain.y, gridLength, gridLength, gridLength);

});