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

// 页面加载时自动加载第一篇文章
loadArticle(linkElements[0].dataset.url);

//写入md
const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const octokit = new Octokit({ auth: 'YOUR_ACCESS_TOKEN' });

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/message', async (req, res) =>
{
    const message = req.body.message;

    // 将留言追加到文件中
    fs.appendFileSync('messages.md', `- ${message}\n`);

    // 创建一个新的 Commit 并推送到 GitHub
    const commitMessage = `Add new message: "${message}"`;
    const fileContent = fs.readFileSync('messages.md', 'base64');
    await octokit.repos.createOrUpdateFileContents({
        owner: 'YOUR_GITHUB_USERNAME',
        repo: 'YOUR_GITHUB_REPO',
        path: 'md/messages.md',
        message: commitMessage,
        content: fileContent,
        sha: 'REF_TO_LAST_COMMIT'
    });

    res.send('留言已提交！');
});

app.listen(3000, () => {
    console.log('服务器已启动：http://localhost:3000/');
});
