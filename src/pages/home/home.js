import React from 'react';
import './home.scss';
import styled from 'styled-components';

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			path: props.match.path,
		};
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<React.Fragment>
				<span style={{ 'display': 'none' }} className="p-name">{this.state.path}</span>
				<div className={'content-block'}>
				</div>
				<h2>New Project !!</h2>
			</React.Fragment>
		);
	}

};