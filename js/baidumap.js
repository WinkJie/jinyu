
window.onload = function() {
    // 引入百度地图的 JavaScript API 脚本文件
    // alert("开始加载");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.map.baidu.com/api?v=2.X&ak={XSSa1jF8sblpLUAmMM4ECEMaGzWQppMl}&services=&t=20180620115256";
    document.body.appendChild(script);
    alert(script.src);

    // 创建地图并设置中心点和缩放级别
    var map = new BMap.Map("map-container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);

    // 添加地图控件和标记点
    map.addControl(new BMap.NavigationControl());
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

//
//
// // 初始化地图对象  这里的id必须对应页面中HTML元素的id
//     var map = new BMap.Map("map-container");
// // 创建地理编码实例
//     var myGeo = new BMap.Geocoder();
// // 地址（城市名+详细地址）
//     var address = "山西省临汾市襄汾县南贾镇荀董村";
// // 将地址解析结果显示在地图上，并调整地图视野
//     myGeo.getPoint(address, function(point){
//         if (point) {
//             // 将地图中心点移动到目标位置
//             map.panTo(point);
//             // 在该位置创建标注
//             var marker = new BMap.Marker(point);
//             map.addOverlay(marker);
//
//             // 获取该位置的详细信息
//             var infoWindow = new BMap.InfoWindow("");
//             myGeo.getLocation(point, function(result){
//                 infoWindow.setContent(result.address);
//                 marker.openInfoWindow(infoWindow);
//             });
//
//             map.centerAndZoom(point, 15);
// // 添加缩放和平移控件
//             map.addControl(new BMap.NavigationControl());
//             map.addControl(new BMap.ScaleControl());
//         } else {
//             alert("您选择地址没有解析到结果!");
//         }
//     }, "北京市");
};