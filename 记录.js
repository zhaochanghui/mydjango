/*
npm搭建react的webpack环境

简介：加载react和react-dom 的npm包，通过webpack使用react
*安装webpack
*安装react react-dom babel等npm包
*设置webpack.config.js,打包输出bundle.js
*安装 webpack-dev-server，实现热加载
一：安装webpack
当前目录比如d:/
mkdir demo新建demo文件夹，作为项目目录，在此文件夹内进行webpack本地安装
npm init -y 初始化，生成package.json文件
npm install webpack --save-dev 安装成功后demo中会出现node_modules文件夹
注意：不推荐全局安装npm install --global webpack

二：安装需要的npm包
npm install react react-dom --save
npm install --save-dev bable-core babel-loader babel-preset-react babel-preset-es2015
本地安装的webpack命令为./node_modules/.bin/webpack,可以通过打开package.json,在"script":{}中加入"start":'webpack',这样可以用npm start 命令代替./node_modules/.bin/webpack

三:配置webpack运行环境
1.创建文件，最终结构如下：
+--demo
| +--app
| |--index.js
| +--dist
| +--node_modules
| ---index.html
| ---package.json
| ---webpack.config.js

app/index.js将作为入口文件，dist用于盛放webpack打包输出的bundle.js,webpack.config.js用于配置webpack环境

2.设置webpack.config.js
const path = require('path');
module.exports = {
	entry: './app/index.js',  //入口文件
	output: {
		path: path.join(__dirname,'/dist/'), //所有输出文件的目标路径，绝对路径
		filename: 'bundle.js'
	},
	watch: true,
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 9090
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ["es2015","react"]
			}
		}]
	}
};


loaders项里面表示用来加载这种类型的资源的loader，loader的使用可以参考官方文档

test，是一段正则，表示进行匹配的资源类型。

exclude为指定应该被忽略的文件，我们在这儿指定了/node_modules/。

query有2种写法，参见query-parameters, 一种是直接以字符串形式跟在loader名后：

loader: 'babel-loader?presets[]=es2015

另一种如本文所示：
query: {
presets: ['es2015']
}

关于devServer。后面的npm start需要用到。先安装webpack-dev-server
npm install webpack-dev-server
然后：打开webpack.config.js写入：

devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    progress:true,
    port:9090 //端口你可以自定义
}

然后还需要在package.json里加入：
"scripts": {
   "start": "webpack",
   "server": "webpack-dev-server --open"
  },

3.编写index.js和index.html文件
index.js

var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(
	<h1>Hello world!</h1>,
	document.getElementById('root')
);


index.html

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id='root'></div>
	<script src='./dist/bundle.js'></script>
</body>
</html>

目前还没打通配置webpack,npm run server就可以监听变化并实时打包js文件。我现在是单独分开的：
webpack命令可以实时监听文件变化并打包
npm run server 可以开启一i个web服务器
2个dos ,一个执行webpack   一个执行npm run server




react组件编写和使用：

写2个组件，用于显示网站的标题(name.js)和链接(link.js)，并require到入口文件中
+--demo
| +--app
| |--+components
| |----name.js
| |----link.js
| |--index.js
| +--dist
| +--node_modules
| ---index.html
| ---package.json
| ---webpack.config.js

app下新建文件夹components,进入components,新建name.js,link.js。
name.js

var React = require('react');
var ReactDOM = require('react-dom');
class WebName  extends React.Component {
	render() {
		return (
				<div>
					标题
				</div>
			);
	}
}
module.exports = WebName;

link.js

var React = require('react');
var ReactDOM = require('react-dom');

class Link extends React.Component {
	render() {
		return (
			<a href='http://www.hitecloud.cn'>link</a>
			);
	}
}

module.exports = Link;

修改入口文件：app/index.js
var React = require('react');
var ReactDOM = require('react-dom');
var NameComponent = require('./components/name.js');
var LinkComponent = require('./components/link.js');
ReactDOM.render(
	<div>
		<NameComponent />
		<LinkComponent />
	</div>,
	document.getElementById('root')
	);



Webpack中 的css-loader和less-loader（webpack，npm,react项目，组件中引入css实现）：
简介：在Webpack中，通过css-loader，可以实现在js文件中通过require的方式，来引入css。
1.css-loader

我们需要在js文件里，通过require的方式来引入css，我们来看具体的方法，首先需要安装css-loader，
style-loader(安装style-loader的目的是为了在html中以style的方式嵌入css)。

npm install css-loader style-loader --save-dev

./compnents/name.js修改为：

var React = require('react');
var ReactDOM = require('react-dom');
class WebName  extends React.Component {
	render() {
		return (
				<div id="box">
					标题
				</div>
			);
	}
}
module.exports = WebName;


然后在入口index.js中：
require('./app.css');

在app.css中：

#box{
  color: blue;
  font-size: 40px;
}


在webpack.config.js下的module下增加css-loader：

const path = require('path');
module.exports = {
	entry: './app/index.js',
	output: {
		path: path.join(__dirname,'/dist/'),
		filename: 'bundle.js'
	},
	watch: true,
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 9090
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ["es2015","react"]
			}
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}
		]
	}
};

webpack    npm run server 执行 看效果

2.less-loader
同样的，如果我们需要在js中，require，.less文件，那么我们需要增加包less-loader和less包
npm install less,less-loader --save-dev

在webpack.config.js修改：

module: {
        loaders: [
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},

        ]
    }

在module的loaders中，增加了！less-loader。
如此便可以在js中，require .less文件。






2018-09-10 react-router入门：
import React from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'//导入的方式跟之前有点变化

// require('../bootstrap-3.3.7-dist/css/bootstrap.css');
require("../style.css");

const One = function() {
    return(
    <div>
        <h2>首页</h2>
    </div>
    );
};




const Two = function(){
    return (
        <div>
            <h2>我是第二页</h2>
        </div>
    );
};



const Lists = function( match )
{
    return (
        <div>
            <h3>{match.params.ListsId}</h3>
        </div>
    );
};

const List = function( match ) {
    return(
        <div>
            <h2>我是一个列表</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/我是第一个哈哈`}>
                        列表下边的第一个
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/我是第二个呵呵`}>
                        列表下边的第二个
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/我是第三个嘿嘿`}>
                        列表下边的第三个
                    </Link>
                </li>
            </ul>
            <Route path={`${match.url}/:ListsId`} component={Lists}/>
            <Route exact path={match.url} render={() => (
                <h3>点击上边的列表项此处显示与url地址一样的...</h3>
            )}/>
        </div>
    );
};


const RouterList = function() {
    return(
        <Router>
            <div>
                <Link to="/" className='home1'>首页</Link>
                <br/>
                <Link to="/two">第二页</Link>
                <br/>
                <Link to="/Lists">一个列表</Link>
                <br/>
                <Route exact path="/" component={One}/>
                <Route path="/two" component={Two}/>
                <Route path="/Lists" component={List}/>
            </div>
        </Router>
    );
}



export default RouterList



箭头函数：
class Home extends React.Component{
    render() {
        return (
            <div>
                home,home
            </div>
        )
    };
}


 const Home1 = ()=>(
     <div>
         home.home
     </div>
 )



axios post: https://stackoverflow.com/questions/50451025/posting-form-data-with-axios-to-net-api
axios: post提交：  multipart/form-data:  https://stackoverflow.com/questions/47874659/making-an-axios-post-request-with-multipart-form-data-via-react-native-debugger


header中Content-type为的post写法： application/x-www-form-urlencoded 和 multipart/form-data，默认为application/x-www-form-urlencoded


    multipart/form-data：

   const formData = new FormData();
        formData.append('name', 'tom');
        formData.append('pwd', 0);
        formData.append('secondParam', 0);

        axios({
            url: 'http://127.0.0.1:5000/login',
            method: 'POST',
             //data: 'name="abc"&pwd=123',
            data:formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });


    application/x-www-form-urlencoded： key=value&key1=value1...形式

                axios({
            url: 'http://127.0.0.1:5000/login',
            method: 'POST',
             data: 'name="abc"&pwd=123',
            // data:formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });



flask 接收：
from flask import Flask
from flask import Response,make_response,Request,request


app = Flask(__name__)

@app.route("/")
def index():
    resp = Response("Foo bar baz")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route("/login",methods=['POST'])
def login():
    name = request.form['name']
    pwd = request.form['pwd']

    resp = Response('名字：'+name+" 密码："+pwd)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp



if __name__=='__main__':
    app.run(debug=True)




nginx,gunicorn,flask配置：
参考： https://blog.csdn.net/qq_14898613/article/details/79581209
     https://segmentfault.com/a/1190000011075177


配置文件必须是一个python文件，只是将命令行中的参数写进py文件中而已，如果需要设置哪个参数，则在py文件中为该参数赋值即可。例如：

pip3 install gunicorn

目录结构：
/www/wwwroot/py
[root@VM_227_64_centos py]# ls
example.py  test.py  __pycache__

test.py:

#test.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run()



# example.py
bind = "127.0.0.1:8000"
workers = 2

运行gunicorn：   test  是test.py  项目文件

$ gunicorn -c example.py test:app

等同于

$ gunicorn -w 2 -b 127.0.0.1:8000 test:app


杀掉gunicorn进程例子：
[root@VM_227_64_centos myflask]# pstree -ap|grep gunicorn
  |   |       |-grep,20096 --color=auto gunicorn
[root@VM_227_64_centos myflask]# kill HUP 20096




nginx:   8000端口和上面的对应

server {
    listen       8000;
    server_name  flasktest;
    location / {
            proxy_pass http://127.0.0.1:8000;
    }

}



-------------------->2018-09-12  箭头函数 和 组件 相同的写法，下面2个功能一样
const MainRoute = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/todos" component={Todos} />
        <Route path="/status" component={StatusComponent} />
        <Route path="/nav" component={Nav} />
        <Route path="/login" component={Login} />
        <Route path='/counter' component={ CounterReactRedux } />
        <Route path='/redux' component={ ReduxTest } />
    </Switch>
)


class MainRoute extends  React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/todos" component={Todos} />
                <Route path="/status" component={StatusComponent} />
                <Route path="/nav" component={Nav} />
                <Route path="/login" component={Login} />
                <Route path='/counter' component={ CounterReactRedux } />
                <Route path='/redux' component={ ReduxTest } />
            </Switch>
        );
    }
}


再比如：
const App = () => (
    <div>
        <Provider store={store}>
        <MainRouter/>
        </Provider>
    </div>

)


class App extends React.Component{
    render(){
        return(
            <div>
                <Provider store={store}>
                    <MainRouter/>
                </Provider>
            </div>
        );
    }
}



2018-09-14  富文本编辑器
https://www.yuque.com/margox/be/mrgy92




*/