function Player() {
    //创建玩家
    var player;
    //移动速度
    var speed = 3;
    //玩家的坐标
    var playerX = 40;
    var playerY= 40;
    //图片的宽高
    var playerW = 30;
    var playerH = 30;

    //向下移动的动画图片
    var playerDown = ['img/players/down_01.png', 'img/players/down_02.png', 'img/players/down_03.png', 'img/players/down_04.png'];
    //向上移动的动画图片
    var playerUp = ['img/players/up_01.png', 'img/players/up_02.png', 'img/players/up_03.png', 'img/players/up_04.png'];
    //向左移动的动画图片
    var playerLeft = ['img/players/left_01.png', 'img/players/left_02.png', 'img/players/left_03.png', 'img/players/left_04.png'];
    //向右移动的位置
    var playerRight = ['img/players/right_01.png', 'img/players/right_02.png', 'img/players/right_03.png', 'img/players/right_04.png'];

    var paint;
    //图片的下标
    var index = 0;

    this.init=function (paint1) {
        paint = paint1;
        player = new Image();
        player.src = playerDown[index];
    }

    var PLAYER_UP = 119;
    var PLAYER_DOWN = 115;
    var PLAYER_LEFT = 97;
    var PLAYER_RIGHT = 100;
    var PLAYER_FIRE = 32;

    //键盘事件
    this.onkeypress = function (keyCode) {
        switch (keyCode) {
            case PLAYER_UP:
                //向上移动
                if(this.getIsMoveUp()){
                    this.moveUp();
                }
                break;
            case PLAYER_DOWN:
                //向下移动
                if(this.getIsMoveDown()){
                    this.moveDown();
                }
                break;
            case PLAYER_LEFT:
                //向左移动
                if(this.getIsMoveLeft()){
                    this.moveLeft();
                }
                break;
            case PLAYER_RIGHT:
                //向右移动
                if(this.getIsMoveRight()){
                    this.moveRight();
                }
                break;
            case PLAYER_FIRE:
                //放置炸弹
                setBoom();
                break;
        }
    }

    //向上移动
    this.moveUp = function () {
        //处理图片位移
        playerY = playerY - speed;
        if (playerY < 40)
            playerY = 40;
        player.style.top = playerY + "px";

        //处理图片的动画
        index++;
        if(index>=4)
            index=0;
        player.src=playerUp[index];
    }

    //向下移动
    this.moveDown = function () {
        playerY = playerY + speed;
        if (playerY > 480 - playerH)
            playerY = 480 - playerH;
        player.style.top = playerY + "px";

        //处理图片的动画
        index++;
        if(index>=4)
            index=0;
        player.src=playerDown[index];
    }

    //向左移动
    this.moveLeft = function () {
        playerX = playerX - speed;
        if (playerX < 40)
            playerX = 40;
        player.style.left = playerX + "px";

        //处理图片的动画
        index++;
        if(index>=4)
            index=0;
        player.src=playerLeft[index];
    }

    //向右移动
    this.moveRight = function () {
        playerX = playerX + speed;
        if (playerX > 640 - playerW)
            playerX = 640 - playerW;
        player.style.left = playerX + "px";

        //处理图片的动画
        index++;
        if(index>=4)
            index=0;
        player.src=playerRight[index];
    }


    var setBoom;
    this.setBoomListener=function (call) {
        setBoom=call;
    }


    var MY_NORMAL = 0;
    var MY_BOOM = MY_NORMAL + 1;
    var state = MY_NORMAL;

    this.collision = function (enemy) {
        var isCollision = false;
        //console.log(enemy.enemyX,enemy.enemyY);
        //检测敌人是否和玩家有碰撞
        if (playerX < (enemy.enemyX + enemy.enemyW) &&
            (playerX + playerW) > enemy.enemyX &&
            (playerY + playerH) > enemy.enemyY &&
            (enemy.enemyY + enemy.enemyH) > playerY) {
            state = MY_BOOM;
            isCollision = true;
            return;
        }
        return isCollision;
        //console.log(isCollision);
    }

    var xiabiao = -1;
    var booms = ['./img/players/play_01.png','./img/players/play_02.png','./img/players/play_03.png','./img/players/play_04.png','./img/players/play_05.png','./img/players/play_06.png','./img/players/play_07.png'];
    this.explosion = function () {
        xiabiao++;
        if (xiabiao >= 7) {
            //state = MY_NORMAL;
            //xiabiao = -1;
            alert("游戏结束！");
        } else {
            player.src = booms[xiabiao];
        }
    }

    //设置炸弹爆炸状态
    this.setBoom = function () {
        state = MY_BOOM;
    }

    //设置监听
    var callMap;
    this.setMapListener=function (call) {
        callMap=call;
    }

    //得到当前的横坐标
    this.getI=function () {
        var i =Math.floor((playerY+playerH)/40);
        return i;
    }

    //得到当前的纵坐标
    this.getJ=function () {
        var j =Math.floor((playerX+playerH)/40);
        return j;
    }

    //是否能够向左移动
    this.getIsMoveLeft=function () {
        //当前位置的左边
        var j=this.getJ()-1;
        var buffer =callMap()[this.getI()][j];

        var left=j*40;
        if(buffer!=1&&playerX<=(left+40)){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向右移动
    this.getIsMoveRight=function () {

        //当前位置的右边
        var j=this.getJ()+1;
        var buffer =callMap()[this.getI()][j];

        var right=j*40;
        if(buffer!=1&&(playerX+40)>=right){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向上移动
    this.getIsMoveUp=function (){
        //当前位置的上边
        var i=this.getI()-1;
        var buffer =callMap()[i][this.getJ()];

        var up=i*40;
        if(buffer!=1&&playerY>=(up+40)){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向下移动
    this.getIsMoveDown=function (){
        //当前位置的下边
        var i=this.getI()+1;
        var buffer =callMap()[i][this.getJ()];

        var down=i*40;
        if(buffer!=1&&(playerY+40)>=down){
            return false;
        }else{
            return true;
        }
    }

    this.run=function (paint) {

        switch (state) {
            case MY_NORMAL:
                paint.drawImage(player,playerX,playerY,playerW,playerH);
                break;
            case MY_BOOM:
                this.explosion();
                break;
        }
    }

    this.getX=function () {
        return playerX;
    }
    this.getY=function () {
        return playerY;
    }
    this.getW=function () {
        return playerW;
    }
    this.getH=function () {
        return playerH;
    }

    //玩家是否碰撞到炸弹
    this.iscollision=function (x,y) {
        var i = Math.floor(y/40);
        var j = Math.floor(x/40);
        var m = this.getX();
        var n = this.getY();
        console.log("i="+i,"j="+j);
        //console.log("m="+m,"n="+n);
        if(((j-4)*40<=m&&m<=(j+5)*40&&n>=i*40&&n<=(i+1)*40)
            ||((i-4)*40<=m&&m<=(i+5)*40&&n>=j*40&&n<=(j+1)*40)){
            this.resetBoom();
        }
    }

    this.resetBoom=function () {
        player.src = "";
        alert("游戏结束！");
    }

}