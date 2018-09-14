# mydjango
1.运用django2.1框架，入口从python入，模板文件引入webpack打包的js的文件
2.通过npm搭建React的webpack环境

git clone 这个项目，或者直接下载，解压，react 静态项目在static下
进入之后，npm install
注意：我的Node是最新的（2017.10.24）

npm install 之后，

2个命令行，一个webpack
一个npm run dev

然后localhost:9090

打包：npm run build 之后，在static/dist/下生产打包文件bundle.js,模板文件中直接引入他就行

谷歌活火狐浏览器打开，搜狗不行哦,IE不知道，

问题1：好像css是直接打包到js里的，下一步，解决

linux上部署：我是nginx+gunicorn,详细教程后面更新