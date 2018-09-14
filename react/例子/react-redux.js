import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore,combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';


//定义单纯用来展示UI的展示组件
class Counter extends Component {
	render() {
		console.log('展示组件');
		const { value,jian, jia ,cheng, chu} = this.props;
		return (
			<div>
				<p> {value} </p>
				<button onClick={jian}>减一个</button>
				<button onClick={jia}>加一个</button>
				<button onClick={cheng}>乘以5</button>
				<button onClick={chu}>除以5</button>
			</div>
			);
	}
}


//定义映射函数，生成容器组件
const mapStateToProps = (state) => {
	console.log('mapStateToProps',state)
	return {
		value: state.cnt
	}
}



const mapDispatchToProps = (dispatch) => {
	console.log('mapDispatchToProps',dispatch);
	return ({
		jian: ()=>{
			dispatch({type: 'jian'});
		},
		jia:()=>{
			dispatch({type:'jia'});
		},
		cheng:()=>{
			dispatch({type:'cheng'});
		},
		chu:()=>{
			dispatch({type:'chu'});
		}
	});
}

const APP = connect(mapStateToProps, mapDispatchToProps)(Counter);

//reducer稍微修改一下
const reducer = (state ={cnt:0}, action)=>{
	console.log('reducer',action.type,'  ------')
	switch(action.type) {
		case 'jia':
			return {cnt: state.cnt+1};
		case 'jian':
			return {cnt: state.cnt-1};
		case 'cheng':
			return {cnt: state.cnt*5};	
		case 'chu':
			return {cnt: state.cnt/5};	
		default:
			return state;		
	}
};
const store = createStore(reducer);


//渲染函数中的结构外部嵌套Provier并添加store
ReactDOM.render(
	<Provider store={store}>
		<APP />
	</Provider>,
	document.getElementById('root')
	);