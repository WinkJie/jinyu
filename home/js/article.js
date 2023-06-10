// 配置 Showdown
const converter = new showdown.Converter();

// 获取用来显示文章内容的元素和索引列表元素
const contentElement = document.getElementById("content");
const indexElement = document.getElementById("index");

// 获取索引列表中所有链接元素
const linkElements = indexElement.querySelectorAll("a");

// 加载文章
function loadArticle(url) {
    // 发送 GET 请求获取文章内容
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
        // 将 markdown 文本转换为 HTML
        const html = converter.makeHtml(xhr.responseText);

        // 创建用于显示文章的元素
        const articleElement = document.createElement("div");
        articleElement.innerHTML = html;

        // 将元素添加到页面中
        contentElement.innerHTML = "";
        contentElement.appendChild(articleElement);
    };
    xhr.send();
}

// 给每个链接元素添加点击事件处理函数
for (const linkElement of linkElements) {
    linkElement.addEventListener("click", (event) => {
        event.preventDefault(); // 阻止链接默认行为
        const url = event.target.dataset.url; // 获取文章路径
        loadArticle(url); // 加载文章
    });
}

const queryString = window.location.search; // 获取查询参数字符串（例如："?article=1"）
const urlParams = new URLSearchParams(queryString); // 创建 URLSearchParams 对象
const articleId = urlParams.get('article'); // 获取查询参数 "article" 的值
// 或者：const articleId = window.location.hash.substring(1); // 获取 URL 中的标识符（例如："#article-1" -> "article-1"）
// 然后根据 articleId 加载相应的文章内容...

// 页面加载时自动加载第一篇文章
loadArticle(linkElements[articleId-1].dataset.url);