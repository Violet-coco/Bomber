function Map() {
    //地图数据
    var mapData=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,2,1,2,2,2,1,2,2,2,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,0],
        [0,1,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
        [0,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0],
        [0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,2,0],
        [0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    var cellWidth=40;
    var cellHight=40;
    var cells=[];

    var rowNum=mapData.length;
    var colNum = mapData[0].label;

    this.init=function () {
        //创建二维数组绘制地图
        var length = rowNum;
        for(var i=0;i<length;i++){
            cells[i]= [];
            var buffer=mapData[i];
            for(var j=0;j<buffer.length;j++){
                var cell = new Cell();
                cell.init(buffer[j],j*cellWidth,i*cellHight);
                cells[i][j]=cell;
            }
        }
    }



    this.getMap=function () {
        return mapData;
    }


    this.run=function (paint) {

        cells.forEach(function (cell2) {
            cell2.forEach(function (cell) {
                cell.run(paint);
            });
        })
    }


    //得到当前的横坐标
    this.getI=function (y) {
        var i =Math.floor(y/40);
        return i;
    }

    //得到当前的纵坐标
    this.getJ=function (x) {
        var j =Math.floor(x/40);
        return j;
    }

    //重置地图
    this.resetMap=function (x,y) {
        var i = this.getI(y);
        var j = this.getJ(x);
        //console.log("被销毁K"+i+"j="+j);
        for(var m=1;m<=4;m++){
            this.checkVertical(i-m,j);
            this.checkHorizontal(i,j-m);
        }

        for(var m=1;m<=4;m++){
            this.checkVertical(i+m,j)
            this.checkHorizontal(i,j+m);
        }
        
    }

    //爆炸的垂直方向
    this.checkVertical=function (i,j) {
        if(i<0||i>=rowNum)
            return;
        if(mapData[i][j]==2){
            mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");
            cells[i][j].reset();
        }
    }

    //爆炸的水平方向
    this.checkHorizontal=function (i,j) {
        if(j<0||j>=colNum)
            return;
        if(mapData[i][j]==2){
            mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");
            cells[i][j].reset();
        }
    }

}