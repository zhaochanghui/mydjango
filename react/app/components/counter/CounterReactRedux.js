import { connect } from 'react-redux';

//===引入组件===
import Counter from './Counter.js';

//===react-redux封装组件====

//哪些Redux全局state是我们组件想要通过props获取的
function mapStateToProps(state) {
	return {
		value: state.cnt
	};
}


//哪些action创建函数是我们要通过props获取的？
function mapDispatchToProps(dispatch) {
	return {
		jia: ()=>{
			dispatch({type: "jia"})
		},
		jian: ()=>{
			dispatch({type: 'jian'})
		},
		cheng: ()=>{
			dispatch({type: 'cheng'})
		},
		chu: ()=>{
			dispatch({type: "chu"})
		}
	};
}

//封装传递state和dispatch
var CounterReactRedux = connect(mapStateToProps,mapDispatchToProps)(Counter);

export default CounterReactRedux