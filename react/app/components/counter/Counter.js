import React, { Component } from 'react';
import { Route,Link } from 'react-router-dom';
import '../../static/base.css';

class Counter extends Component {
	render() {
		const { value, jia, jian, cheng, chu } = this.props;

		return (
			<div>
				<p className='time'>{value}</p>
				<button className='btn btn-info' onClick={jia}>加一个</button>
				<button className='btn btn-info' onClick={jian}>减一个</button>
				<button className='btn btn-info' onClick={cheng}>乘以2</button>
				<button className='btn btn-info' onClick={chu}>除以2</button>
			</div>
			);
	}
}


export default Counter