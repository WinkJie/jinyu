
window.onload = function() {
    // 引入百度地图的 JavaScript API 脚本文件
    alert("开始加载");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.X&ak={XSSa1jF8sblpLUAmMM4ECEMaGzWQppMl}&services=&t=20180620115256";
    document.body.appendChild(script);
    alert(script.src);

    // 创建地图并设置中心点和缩放级别
    var map = new BMap.Map("map");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);

    // 添加地图控件和标记点
    map.addControl(new BMap.NavigationControl());
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
};