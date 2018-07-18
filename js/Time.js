function Time() {
    //创建时间
    var time;
    //游戏时间长度5分钟
    var timeW = 300;
    this.init=function () {
        var box = document.getElementById('box');
        time = document.createElement('h2');
        //设置颜色
        time.style.color="#ffffff";
        //初始化
        time.innerHTML="TIME:  " +timeW + "S";
        //设置分数的位置
        time.style.position="absolute";
        time.style.left="40px";
        time.style.top="10px";
        box.appendChild(time);
    }

    this.setTime=function() {
        if (timeW >0) {

            timeW--;
            time.innerHTML = "TIME:  " +timeW + "S";
        }else{
            clearInterval(time);
            alert("时间到，游戏结束!");
        }
    }

    this.run=function () {

        this.setTime();
    }
}