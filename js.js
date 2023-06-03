// 获取按钮元素和弹窗元素
var playBtn = document.getElementById('play-btn');
var videoDialog = document.getElementById('video-dialog');
var closeBtn = document.querySelector('#video-dialog .close-btn');

// 点击按钮显示弹窗
playBtn.onclick = function() {
    videoDialog.style.display = 'block';
}

// 点击关闭按钮隐藏弹窗
closeBtn.onclick = function() {
    videoDialog.style.display = 'none';
}

// 点击弹窗外区域也可隐藏弹窗
videoDialog.onclick = function(event) {
    if (event.target == videoDialog) {
        videoDialog.style.display = 'none';
    }
}
