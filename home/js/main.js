$(document).ready(function(){

toggle_nav_container();
gotoByScroll();


});
var toggle_nav_container = function () {



	var 	$toggleButton = $('#toggle_m_nav');
			$navContainer = $('#m_nav_container');
			$menuButton = $('#m_nav_menu')
			$menuButtonBars = $('.m_nav_ham');
			$wrapper = $('#wrapper');

	// toggle the container on click of button (can be remapped to $menuButton)

	$toggleButton.on("click", function(){

		// declare a local variable for the window width
		var $viewportWidth = $(window).width();

		// if statement to determine whether the nav container is already toggled or not

		if($navContainer.is(':hidden'))
		{	
			$wrapper.removeClass('closed_wrapper');
			$wrapper.addClass("open_wrapper");
			$navContainer.slideDown(200).addClass('container_open').css("z-index", "2");
			// $(window).scrollTop(0);
			$menuButtonBars.removeClass('button_closed');
			$menuButtonBars.addClass('button_open');
			$("#m_ham_1").addClass("m_nav_ham_1_open");
			$("#m_ham_2").addClass("m_nav_ham_2_open");
			$("#m_ham_3").addClass("m_nav_ham_3_open");

		}
		else
		{
			$navContainer.css("z-index", "0").removeClass('container_open').slideUp(200)
			$menuButtonBars.removeClass('button_open')
			$menuButtonBars.addClass('button_closed')
			$wrapper.removeClass('open_wrapper')
			$wrapper.addClass("closed_wrapper")
			$("#m_ham_1").removeClass("m_nav_ham_1_open");
			$("#m_ham_2").removeClass("m_nav_ham_2_open");
			$("#m_ham_3").removeClass("m_nav_ham_3_open");

		}
	});



}


// Function that takes the href value of links in the navbar and then scrolls 
//the div on the page whose ID matches said value. This only works if you use 
//a consistent naming scheme for the navbar anchors and div IDs

var gotoByScroll = function ()
{
	$(".m_nav_item a").on("click", function(e)
	{
		e.preventDefault();
		// var $divID =$(this).attr("href");
		// var $scrollToDiv = "$(" + "'" + $divID + "'" +")";
		$('html,body').animate({
   scrollTop: $($(this).attr("href")).offset().top - 50
}, "slow");
	});
}


//
// const textElement = document.querySelector('.introText');
// const showMoreButton = document.querySelector('.getmore');
// showMoreButton.addEventListener('click', () => {
//     // 显示全部文本
//     textElement.style.height = 'auto';
//     // 隐藏“显示更多”按钮
//     showMoreButton.style.display = 'none';
// });
//
// const textElement1 = document.querySelector('.introText1');
// const showMoreButton1 = document.querySelector('.getmore1');
// showMoreButton1.addEventListener('click', () => {
//     // 显示全部文本
//     textElement1.style.height = 'auto';
//     // 隐藏“显示更多”按钮
//     showMoreButton1.style.display = 'none';
// });
function toggleContent(className,getmorename) {
    var content = document.querySelector("." + className);
    var button = document.querySelector("." + getmorename);
    if (content.style.height === "90px") {
        content.style.height = "auto";
        button.innerText = "折叠";
    } else {
        content.style.height = "90px";
        button.innerText = "展开";
    }
}


// 初始化地图对象  这里的id必须对应页面中HTML元素的id
var map = new BMap.Map("map-container");
// 创建地理编码实例
var myGeo = new BMap.Geocoder();
// 地址（城市名+详细地址）
var address = "山西省临汾市襄汾县南贾镇荀董村";
// 将地址解析结果显示在地图上，并调整地图视野
myGeo.getPoint(address, function(point){
    if (point) {
        // 将地图中心点移动到目标位置
        map.panTo(point);
        // 在该位置创建标注
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);

        // 获取该位置的详细信息
        var infoWindow = new BMap.InfoWindow("");
        myGeo.getLocation(point, function(result){
            infoWindow.setContent(result.address);
            marker.openInfoWindow(infoWindow);
        });

        map.centerAndZoom(point, 15);
// 添加缩放和平移控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
    } else {
        alert("您选择地址没有解析到结果!");
    }
}, "北京市");






// 创建地图实例并设置初始位置和缩放级别
/*
var map = new BMap.Map("map-container");
var point = new BMap.Point(111.233, 35.526); // 北京市中心
map.centerAndZoom(point, 15);
// 添加缩放和平移控件
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
*/











