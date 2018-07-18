function Game() {

    //地图
    var map;
    //游戏时间
    var time;
    //游戏玩家
    var player;
    //游戏中的敌人
    var enemy;
    //敌人数组
    var enemys = [];

    var that;

    this.init=function () {
        that=this;
        //初始化游戏盒子
        this.initGame();
        //初始化背景地图
        this.initMap();
        //初始化玩家
        this.initPlayer();
        //初始化敌人
        this.initEnemy();
    }

    var paint;
    this.initGame=function () {

        //获得游戏的画布
        var myCanvas = document.getElementById('myCanvas');

        //创建一个画笔
        paint = myCanvas.getContext("2d");
    }
    
    this.initMap=function () {
        //地图
        map = new Map();
        //初始化
        map.init();
        //this.setisUpdateListener(this.isUpdateListener);
    }

    this.initPlayer=function () {
        //游戏玩家
        player = new Player();
        //初始化
        player.init(paint,enemy);
        //设置地图的监听
        player.setMapListener(this.mapListener);
        player.setBoomListener(this.boomListener);


    }

    this.mapListener=function () {
        return map.getMap();
    }
    
    this.boomListener=function () {
        that.setBomb();
    }

    this.initEnemy=function () {
        //游戏中的敌人
        enemy = new Enemy();
        //初始化
        enemy.init();

        enemys.push(enemy);
        //console.log(enemys.length);

        //设置地图的监听
        enemy.setMapListener(this.mapListener);
    }

    //键盘事件
    this.onkeypress=function (keyCode){
        player.onkeypress(keyCode);
    }
    
    this.run=function () {
        map.run(paint);
        enemy.run(paint);

        player.run(paint);
        player.collision(enemy);

        for(var i=0;i<bombs.length;i++){
            //console.log(bombs[i].getX());
            bombs[i].run(paint,i);
        }
    }

    //放置炸弹
    var bombs = [];
    this.setBomb = function () {
        var bomb = new Bomb();
        bomb.init(player.getX() + player.getW() / 2,player.getY() + player.getH());
        bomb.setBoomListener(this.boomOverListener);
        bombs.push(bomb);
    }

    this.boomOverListener=function (index) {

        var bombX = bombs[index].getX();
        var bombY = bombs[index].getY();

        map.resetMap(bombX,bombY);
        player.iscollision(bombX,bombY);
        enemy.collision(bombX,bombY);
        // if(enemy.collision(bombX,bombY)){
        //     enemy.destroy();
        //     enemy=null;
        // }
        bombs.splice(index,1);
    }
}