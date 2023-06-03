/*通过jq来实现功能*/
$(function(){
    /*1.获取播放器*/
    var video=$("video")[0];

    /*2.实现播放与暂停*/
    $(".switch").click(function(){
        /*实现播放与暂停的切换，如果是暂停 >> 播放 ，如果是播放 >> 暂停*/
        if(video.paused){
            video.play();
            /*移除暂停样式，添加播放样式*/
        }
        else{
            video.pause();
            /*移除播放样式，添加暂停样式*/
        }
        /*设置标签的样式*/
        /*toggleClass:在两个样式之间做切换
         * fa-play:播放
         * fa-pause:暂停
         * */
        $(this).toggleClass("fa-play fa-pause");
    });

    /*3.实现全屏操作*/
    $(".expand").click(function(){
        /*全屏处理，不同浏览器需要添加不同前缀 >> 能力测试*/
        if(video.requestFullscreen){
            video.requestFullscreen();
        }
        else if(video.webkitRequestFullScreen){
            video.webkitRequestFullScreen();
        }
        else if(video.msRequestFullscreen){
            video.msRequestFullscreen();
        }
        else if(video.mozRequestFullScreen){
            video.mozRequestFullScreen();
        }
    });

    /*4.实现播放业务逻辑：当视频文件可以播放时触发下面的事件（start）*/
    video.oncanplay=function(){
        /*由于是本地文件，视频一下子就加载出来，所以看不到过程，添加一个延时显示即可*/
        setTimeout(function(){
            /*1.将视频文件设置为显示,加载图消失*/
            video.style.display="block";
            $(".player").css("background","black");
            /*2.获取当前视频文件的总时长,duration*/
            var total=video.duration; /*00:04:23*/
            /*console.log(total);*/
            /*3.计算时分秒 60*60=3600
             * 3700:3700/3600
             * 3700:3700%3600 >> 100/60
             * Math.floor():显示整数
             * */
            /*console.log(Math.floor(3700/3600));*/
            /*补0操作：时分秒都是两位，当不足两位时需要补0*/
            /*var hour=Math.floor(total/3600);
            hour=hour<10?"0"+hour:hour;
            var minute=Math.floor(total%3600/60);
            minute=minute<10?"0"+minute:minute;
            var second=Math.floor(total%60);
            second=second<10?"0"+second:second;*/
            var result=getResult(total);
            /*测试结果*/
            /*console.log(hour+":"+minute+":"+second);*/

            /*4.将计算记结果展示在指定的dom元素中*/
            $(".totalTime").html(result);
        },2000);
    }

    /*通过总时长计算时分秒*/
    function getResult(time){
        var hour=Math.floor(time/3600);
        hour=hour<10?"0"+hour:hour;
        var minute=Math.floor(time%3600/60);
        minute=minute<10?"0"+minute:minute;
        var second=Math.floor(time%60);
        second=second<10?"0"+second:second;
        /*返回结果*/
        return hour+":"+minute+":"+second;
    }

    /*5.实现播放过程中的业务逻辑，当视频播放时会触发ontimeupdate事件（进行中）

     * 如果修改currentTime值也会触发这个事件，只要currentTime值变化，就会触发此事件
     * */
    video.ontimeupdate=function(){
        /*1.获取当前播放时间*/
        var current=video.currentTime;
        console.log(current);
        /*2.计算出时分秒,调用getResult(time)函数*/
        var result=getResult(current);
        /*3.将计算记结果展示在指定的dom元素中*/
        $(".currentTiime").html(result);
        /*4.设置当前播放进度条样式*/
        var percent=current/video.duration*100+"%"
        $(".elapse").css("width",percent);
    };

    /*实现视频的跳播*/
    $(".bar").click(function(e){
        /*问题：1.如何获取当前点击位置，用偏移值ofsetX
         * 2.点击的时候总是从头开始：Hbuilder对视频的支持不够，需要从源文件中打开
         * */
        /*1.获取当前鼠标相对于父元素的left偏移值*/
        var offset=e.offsetX;
        /*2.计算偏移值相对于总父元素总宽度的比例*/
        var percent=offset/$(this).width();
        /*3.计算这个位置对应的视频进度值*/
        var current=percent*video.duration;
        /*4.设置当前视频的currenTime*/
        video.currentTime=current;
    });

    /*7.播放完毕后重置播放器的状态*/
    video.onended=function(){
        video.currentTime=0;
        $(".switch").removeClass("fa-pause").addClass("fa-play");
        video.style.display="none";
    }
});

