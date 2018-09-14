import { combineReducers } from 'redux';

const counterRedux = (state ={cnt: 0}, action)=> {
	switch(action.type) {
		case 'jia':
			return {cnt: state.cnt+1 };
		case 'jian':
			return {cnt: state.cnt-1 };
		case 'cheng':
			return {cnt: state.cnt*2 };
		case 'chu':
			return {cnt: state.cnt/2 };
		default:	
			return state;				
	}
}


const todosRedux = (state=0,action)=>{
	switch(action.type){
		case 'add':
			return state+1;
		case 'desc':
			return state-1;	
		default:
			return state;	
	}
}

const rootRedux = combineReducers({
	counterRedux,
	todosRedux
})

export default counterRedux
