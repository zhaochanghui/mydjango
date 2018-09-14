import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div>
                <h1 className="page-header">about</h1>

                <div className="row placeholders">


                </div>

                <h2 className="sub-header">Section title</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Header</th>
                            <th>Header</th>
                            <th>Header</th>
                            <th>Header</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1,001</td>
                            <td>Lorem</td>
                            <td>ipsum</td>
                            <td>dolor</td>
                            <td>sit</td>
                        </tr>


                        </tbody>
                    </table>
                </div>
			</div>
			);
	}
}


export default About