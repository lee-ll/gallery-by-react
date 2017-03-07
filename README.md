# gallery-by-react
one-photo gallery progect based on react
#React画廊项目实战
##项目生成
1. 安装yeoman 
  `yo --version`    检查是否安装成功;

2. 安装webpack 
  `npm install -g generator-react-webpack`
3. 创建项目目录

    项目名称为 gallery-by-react

	yo react-webpack gallery-by-react
	npm start

Tips

* webpack.config.js webpack 的生产环境 
* webpack.dist.config.js  webpack开发环境的配置文件
* package.json 项目的配置文件
* node 声明当前项目所依赖的 NPM 包
* karma.conf.js 测试框架的配置文件
* .eslintrc 和 .jshintrc 是代码风格检测工具，因为 .jshintrc 不支持 JSX 的语法，这时需要 
* 项目运行 `npm run start`
##代码编写
* 为css配置适配不同的浏览器

    `npm install autoprefixer-loader --save-dev`

* cfg文件夹下的default.js增加相应配置；

* style中的css文件改成scss文件；

* components里面的main.js中require相应改变；

* src创建data文件夹，新建imageDatas.json；

* 图片放入src/images中；在imageDatas.json中加入相关

    `npm install json-loader --save-dev`

* 在components的入口文件main.js中引入图片资源

    `let imageDatas=require("../data/imageDatas.json)`
* 编写一个函数将图片的信息转换为图片URL路径

* 安装nodes-sass(使用淘宝镜像)

    先安装cnpm   
    `npm install -g cnpm --registry=https://registry.npm.taobao.org`
    然后安装node-sass
    `cnpm install node-sass`
     

* 安装sass-loader 

    `npm install sass-loader --save-dev`
##代码提交
    `git status`

    `git add -A` (添加所有文件)

    `git commit -m "init project structure"`(提交代码)

    `git push`(提交)
