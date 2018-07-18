function Enemy() {
    //敌人
    var enemy;
    //敌人的位置
    this.enemyX=280;
    this.enemyY=40;


    //敌人移动的速度
    var speed = 2;
    //敌人图片的大小
    this.enemyW=30;
    this.enemyH=30;
    //敌机的类型
    var type;


    this.init=function () {
        //this.setPosition();
        enemy = new Image();
        //随机敌人的类型
        type = Math.floor(Math.random()*7);


        if(type==0){
            enemy.src="./img/enemys/enemy1_01.png";
        }else if(type==1){
            enemy.src="./img/enemys/enemy2_01.png";
        }else if(type==1){
            enemy.src="./img/enemys/enemy3_01.png";
        }else if(type==1){
            enemy.src="./img/enemys/enemy4_01.png";
        }else if(type==1){
            enemy.src="./img/enemys/enemy5_01.png";
        }else if(type==1){
            enemy.src="./img/enemys/enemy6_01.png";
        }else{
            enemy.src="./img/enemys/enemy_01.png";
        }
    }


    //var time=0;

    //运动方向的状态值
    var MOVE_UP=0;
    var MOVE_DOWN=MOVE_UP+1;
    var MOVE_LEFT=MOVE_DOWN+1;
    var MOVE_RIGHT=MOVE_LEFT+1;
    //状态值
    var state =MOVE_DOWN;


    //移动
    this.move=function () {
        switch (state) {
            case MOVE_UP:
                //向上移动
                if(this.getIsMoveUp()){
                    this.moveUp();
                }else{
                    state = MOVE_DOWN;
                }
                break;
            case MOVE_DOWN:
                //向下移动
                if(this.getIsMoveDown()){
                    this.moveDown();
                }else{
                    state = MOVE_UP;
                }
                break;
            case MOVE_LEFT:
                //向左移动
                if(this.getIsMoveLeft()){
                    this.moveLeft();
                }else{
                    state = MOVE_RIGHT;
                }
                break;
            case MOVE_RIGHT:
                //向右移动
                if(this.getIsMoveRight()){
                    this.moveRight();
                }else{
                    state = MOVE_LEFT;
                }
                break;
        }
    }

    //向上移动
    this.moveUp = function () {
        //处理图片位移
        if(enemy!=null){
            this.enemyY = this.enemyY - speed;
            if (this.enemyY < 40)
                this.enemyY = 40;
            enemy.style.top = this.enemyY + "px";
        }

    }

    //向下移动
    this.moveDown = function () {
        if(enemy!=null){
            this.enemyY = this.enemyY + speed;
            if (this.enemyY > 480 - this.enemyH)
                this.enemyY = 480 - this.enemyH;
            enemy.style.top = this.enemyY + "px";
        }

    }

    //向左移动
    this.moveLeft = function () {
        if(enemy!=null){
            this.enemyX = this.enemyX - speed;
            if (this.enemyX < 40)
                this.enemyX = 40;
            enemy.style.left = this.enemyX + "px";
        }
    }

    //向右移动
    this.moveRight = function () {
        if(enemy!=null){
            this.enemyX = this.enemyX + speed;
            if (this.enemyX > 640 - this.enemyW)
                this.enemyX = 640 - this.enemyW;
            enemy.style.left = this.enemyX + "px";
        }
    }


    //设置监听
    var callMap;
    this.setMapListener=function (call) {
        callMap=call;
    }

    //得到当前的横坐标
    this.getI=function () {
        var i =Math.floor((this.enemyY+this.enemyH)/40);
        return i;
    }

    //得到当前的纵坐标
    this.getJ=function () {
        var j =Math.floor((this.enemyX+this.enemyH)/40);
        return j;
    }

    this.getX=function () {
        return this.enemyX;
    }

    this.getY=function () {
        return this.enemyY;
    }



    //是否能够向左移动
    this.getIsMoveLeft=function () {
        //当前位置的左边
        var j=this.getJ()-1;
        var buffer =callMap()[this.getI()][j];

        var left=j*40;
        //console.log("当前坐标："+this.enemyX,"左边："+(left+40));
        if(buffer!=1&&this.enemyX<=(left+40)){
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
        if(buffer!=1&&(this.enemyX+40)>=right){
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
        if(buffer!=1&&this.enemyY>=(up+40)){
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
        if(buffer!=1&&(this.enemyY+40)>=down){
            return false;
        }else{
            return true;
        }
    }



    //敌人是否碰撞到炸弹
    this.collision=function (x,y) {
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
        enemy.src= "";
        enemy = null;
        if(enemy==null){
            alert("游戏结束！");
        }
    }

    // this.collision=function (x,y) {
    //
    //     if(this.checkVertical(x,y)){
    //         return true;
    //     }
    //
    //     if(this.checkHorizontal(x,y)){
    //         return true;
    //     }
    //     return false;
    // }
    //
    // this.checkVertical=function (x,y) {
    //
    //     var m = this.getX();
    //     var n = this.getY();
    //     var checkStartX = x-4*30;
    //     var checkEndX=x+5*30;
    //     var checkStartY = y;
    //     var checkEndY=y+30;
    //
    //     if(m>checkStartX&&m<checkEndX&&n>checkStartY&&n<checkEndY){
    //
    //         return true;
    //     }
    //     return false;
    //
    // }
    //
    // this.checkHorizontal=function (x,y) {
    //
    //     var m = this.getX();
    //     var n = this.getY();
    //     var checkStartX = x;
    //     var checkEndX=x+30;
    //     var checkStartY = y-4*30;
    //     var checkEndY=y+5*30;
    //
    //     if(m>checkStartX&&m<checkEndX&&n>checkStartY&&n<checkEndY){
    //         return true;
    //     }
    //     return false;
    // }
    //
    // this.destroy=function () {
    //     enemy=null;
    // }

    this.run=function (paint) {

        this.move();
        if(enemy!=null){
            paint.drawImage(enemy,this.enemyX,this.enemyY,this.enemyW,this.enemyH);
        }


        paint.font="bold 20px Arial";
        paint.fillStyle="#058";

        var buffer =callMap()[this.getI()][this.getJ()];
        //paint.fillText(buffer,50,20);

    }


}