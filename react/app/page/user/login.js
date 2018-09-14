import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';


import "../../static/bootstrap/bootstrap.min.css";
import "../../static/bootstrap/signin.css";



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '',pwd:'',userId:''};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangePwd(event) {
        this.setState({pwd: event.target.value});
    }

    handleSubmit(event) {
        // alert('name: ' + this.state.name+"         pwd:"+this.state.pwd);
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('pwd', this.state.pwd);
        formData.append('secondParam', 0);

        axios({
            url: '/login',
            method: 'POST',
            //data: 'name="abc"&pwd=123',
            data:formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data=='ok')
            if(response.data=='ok'){
                alert('登录成功')
                this.setState({userId:'1'});
            }else{
                alert('账号或密码不对')
            }
        }).catch(error => {
            console.error(error);
        });

        event.preventDefault();
    }



    componentDidMount(){

    }

    render() {

        if(this.state.userId=='1'){
            window.location.href='/';
        }else {

            return (

                <div className="container">

                    <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                        <h2 className="form-signin-heading">请登录</h2>
                        <h3 className="panel-title">username</h3>
                        <input type="text" id="name" className="form-control" value={this.state.name}
                               onChange={this.handleChangeName}/>
                        <h3 className="panel-title">password</h3>
                        <input type="password" id="pwd" className="form-control" value={this.state.pwd}
                               onChange={this.handleChangePwd}/>
                        <input type="submit" className="btn btn-lg btn-primary btn-block" value="提交"/>
                    </form>
                </div>

            );
        }
    }
}


export default Login