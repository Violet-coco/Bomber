function Bomb() {
    //创建炸弹
    var bomb;
    //炸弹大小
    var width = 30;
    var height = 30;
    //炸弹的位置
    var bombX;
    var bombY;

    var num=4;

    //爆炸数组
    var blasts=[];


    var BOOM_NORMAL=0;
    var BOOM_RUN=BOOM_NORMAL+1;
    var state=BOOM_NORMAL;


    this.init=function (x,y) {
        this.initBoom(x,y);
        this.initblasts(x,y);
    }

    this.initBoom=function (x,y) {
        bombX = x - width / 2;
        bombY= y - height;
        //console.log(bombX,bombY);
        bomb = new Image();
        bomb.src = "./img/bomb_01.png";
    }

    this.getX=function () {
        return bombX;
    }

    this.getY=function () {
        return bombY;
    }

    var callBack;
    this.setBoomListener=function (call) {
        callBack=call;
    }

    var time=0;

    var index=0;

    var blastUp=[];
    var blastVertical=[];
    var blastMiddle=[];
    var blastDown=[];
    var blastLeft=[];
    var blastLevel=[];
    var blastRight=[];
    this.initblasts=function (x,y) {

        //最上面的图片
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/up_0"+i+".png";
            blastUp.push(img);
        }

        //最上面到中间之间的图
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/vertical_0"+i+".png";
            blastVertical.push(img);
        }

        //中间的图
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/middle_0"+i+".png";
            blastMiddle.push(img);
        }

        //最下面到中间之间的图
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/down_0"+i+".png";
            blastDown.push(img);
        }

        //最左边的图片
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/left_0"+i+".png";
            blastLeft.push(img);
        }

        //水平的图片
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/level_0"+i+".png";
            blastLevel.push(img);
        }

        //最右边的图片
        for(let i=4;i>=1;i--){
            let img = new Image();
            img.src="img/Booms/right_0"+i+".png";
            blastRight.push(img);
        }
    }



    this.run=function (paint,k) {

        switch (state){
            case BOOM_NORMAL:
                time++;
                if(time>32){
                    time=0;
                    state=BOOM_RUN;
                }
                paint.drawImage(bomb, bombX, bombY, width, height);
                break;
            case BOOM_RUN:
                index++;
                if(index>=4){
                    //console.log("销毁炸弹1");
                    callBack(k);
                    state=-1;
                    break;
                }


                //最上面火焰的动画
                paint.drawImage(blastUp[index],bombX,bombY-(num+1)*height,width,height);

                //最上面火焰到中心点之间竖直的火焰
                for(var i=0;i<num;i++){
                    paint.drawImage(blastVertical[index],bombX,bombY-(i+1)*height,width,height);
                }
                //中心的火焰
                paint.drawImage(blastMiddle[index],bombX,bombY,width,height);

                //中心到下面的火焰
                for(var i=0;i<num;i++){
                    paint.drawImage(blastVertical[index],bombX,bombY+(i+1)*height,width,height);
                }

                //最下面的火焰
                paint.drawImage(blastDown[index],bombX,bombY+(i+1)*height,width,height);


                //最左边的火焰
                paint.drawImage(blastLeft[index],bombX-(num+1)*width,bombY,width,height);
                //中心到最左边的火焰
                for(var i=0;i<num;i++){
                    paint.drawImage(blastLevel[index],bombX-(i+1)*width,bombY,width,height);
                }

                //最右边的火焰
                paint.drawImage(blastRight[index],bombX+(num+1)*width,bombY,width,height);
                //中心到最右边的火焰
                for(var i=0;i<num;i++){
                    paint.drawImage(blastLevel[index],bombX+(i+1)*width,bombY,width,height);
                }
                break;
        }


    }
}
