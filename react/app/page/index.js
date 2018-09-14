import React, { Component } from 'react';
import { Link , Redirect } from 'react-router-dom';

// import Login from "./user/login";

import "../static/bootstrap/bootstrap.min.css";
import "../static/bootstrap/signin.css";

import Login from "./user/login";
import axios from 'axios';

// ===首页的展示组件，不负责业务和逻辑，从this.props获取参数
class Home extends Component {
	constructor(props) {
		super(props);
		this.state={
			login_status:'',
            userId:'',
		};
        this.check_login = this.check_login.bind(this);

	}

    check_login(){
        axios.get('/check_login')
            .then(response => {
                console.log("check_login:",response.data);
                if(response.data=='login_ok'){
                    this.setState({userId:'1'});
                }
            } )
            .catch(error => console.log(error));
    }

    componentDidMount(){
	    this.check_login();
    }

	render() {

		if(this.state.userId==''){
            return (<Login />);
		}else {
            return (
                <div>
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">admin manage</a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="#">Dashboard</a></li>
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Help</a></li>
                                </ul>
                                <form className="navbar-form navbar-right">
                                    <input type="text" className="form-control" placeholder="Search..." />
                                </form>
                            </div>
                        </div>
                    </nav>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3 col-md-2 sidebar">
                                <ul className="nav nav-sidebar">
                                    <li className="active"> <Link to="/">Home</Link>  </li>
                                    <li> <Link to="/about">about</Link> </li>
                                    <li> <Link to="/contact">Contact</Link>   </li>
                                    <li> <Link to="/counter">计算器(react-redux例子)</Link>   </li>
                                </ul>
                                <ul className="nav nav-sidebar">
                                    <li> <Link to="/redux">redux例子</Link> </li>
                                    <li> <Link to="/login">login</Link> </li>
                                    <li>  <Link to="/edit">editor</Link>  </li>
                                    <li><a href="">Another nav item</a></li>
                                    <li><a href="">More navigation</a></li>
                                </ul>
                                <ul className="nav nav-sidebar">
                                    <li><a href="">Nav item again</a></li>
                                    <li><a href="">One more nav</a></li>
                                    <li><a href="">Another nav item</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                                {this.props.children}

                            </div>
                        </div>
                    </div>


                    {/*<ul>*/}
                        {/*<li className='btn btn-defualt'><Link to="/">Home</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/about">about</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/contact">Contact</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/counter">计算器(react-redux例子)</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/redux">redux例子</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/login">login</Link></li>*/}
                        {/*<li className='btn btn-defualt'><Link to="/edit">editor</Link></li>*/}
                    {/*</ul>*/}

                </div>
            );
        }
	}
}

export default Home