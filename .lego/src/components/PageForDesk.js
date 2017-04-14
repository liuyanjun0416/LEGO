import React, { Component } from 'react';
import * as Components from 'resources';
export default class PageForDesk extends Component {
	constructor(props,content){
		super(props,content);
		this.state = {
			isEditModeOn: true,
			updateCounter: 0
		};
		this.elementTree = [];
		this._setElementTree = this._setElementTree.bind(this);
	}

	_setElementTree(name,props){
		if(!name){
			return;
		}
		console.log(name,props);
		let domJsx = React.createElement(Components.default[name],props);
		this.elementTree.push(domJsx);
		this.setState({
			updateCounter:this.state.updateCounter + 1
		});
	}

	render(){
		return (
			<div>
				{this.elementTree}
				<p onClick={this._setElementTree.bind(this,"Card",{text:"haha"})}>HelloWorld</p>
			</div>
		)
	}
}

