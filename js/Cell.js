function Cell() {

    //方块的类型
    var type;

    //坐标
    var cellX;
    var cellY;

    //方块
    var cell;

    this.init=function (type1,cellX1,cellY1) {
        cellX=cellX1;
        cellY=cellY1;
        type= type1;
        //console.log(type);
        //console.log(cellX,cellY);
        cell =  new Image();
        switch(type){
            case 0:
                cell.src="./img/wall.png";
                break;
            case 1:
                cell.src="./img/floor.png";
                break;
            case 2:
                cell.src="./img/obstacle.png";
                break;
        }
    }

    this.run=function (paint) {
        paint.drawImage(cell,cellX,cellY,40,40);
    }
    
    this.reset=function () {
        cell.src="./img/floor.png";
        //console.log("被销毁3");
    }

}
