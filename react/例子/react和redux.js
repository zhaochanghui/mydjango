var Redux = require('redux');
var React = require('react');
var ReactDOM = require('react-dom');

//action creator
var addTodo = function(text){
	return {
		type:"add_todo",
		text: text
	};
};

//reducers
var todoReducer = function(state,action){
	if(typeof state === 'undefined'){
		return [];
	}

	switch(action.type){
		case 'add_todo':
			return state.slice(0).concat({
				text: action.text,
				completed: false
			});
			break;
		default:
			return state;	
	}
};

var store = Redux.createStore(todoReducer);



class MyApp extends React.Component{
	constructor(props) {
			super(props);
			this.handleAdd = this.handleAdd.bind(this);
			this.onChange = this.onChange.bind(this);
			this.state = {items: store.getState()};
		}

	componentDidMount() {
				var unsubscribe = store.subscribe(this.onChange);
			}
	onChange() {
		this.setState({items: store.getState()});
	}

	handleAdd() {
		var input = ReactDOM.findDOMNode(this.refs.todo);
		var value = input.value.trim();

		if(value){
			store.dispatch(addTodo(value));
		}

		input.value = '';
	}

	*show(){
		yield 'aabbbb';
		yield 'bb';
		yield 'cc';
		return 'xx';
	}

	render() {
		console.log(this.show().next());

		return (
			<div>
				<input ref='todo' placeholder='输入tudo..' style={{marginRight: "15px"}} />
				<button onClick={this.handleAdd}>点击添加</button>
				<ul>
					{this.state.items.map(function(item,key){
						return <li>{item.text}</li>;
					})}
				</ul>

				<div>
					
				</div>
			</div>
			);
	}				
}



class App extends React.Component {
	render() {
		return (
			<div>
				<MyApp />
			</div>
		);	
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('root')
);

