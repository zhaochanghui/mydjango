import { render } from 'react-dom';
import React from 'react';
import ReactDOM from 'react-dom';
 import { HashRouter, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './static/base.css';

// 页面
 class Repos extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Repos/page of repos 页面</div>
        );
    }
}

//
 class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>About/关于我页面</div>
        );
    }
}

//页面//
class Contact extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>联系页面</div>
	}
}

//首页//
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/repos">Repos</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

//
// 增加2个新路由
ReactDOM.render((
     <HashRouter>
      <App>
	    <Route path="/repos" component={Repos} />
	    <Route path="/about" component={About} />
	    <Route path='/contact' component={Contact} />
      </App>
    </HashRouter>
), document.getElementById('root'));