import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import './About.css';
import * as Components from '../../resources';
class About extends Component {
	constructor(props){
		super(props);

		this.elementTree = [];
		this.state = {
			updateCount:0
		}
	}

	creatElement(name,props){
		if(!name){
			return;
		}
		props = {
			...props,
			key:this.state.updateCount
		};
		let domJsx = React.createElement(Components.default[name],props);
		this.elementTree.push(domJsx);
		this.setState((state)=>{
			return {
				updateCount:state.updateCount+1
			}
		})
	}

	render() {
		return (
			<div className="About">
				<Button type="primary" onClick={this.creatElement.bind(this,'AvatarCard',{
					imgSrc: "https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
				})}>Avatar</Button>
				<Button type="primary" onClick={this.creatElement.bind(this,'Card',{
					text:"haha"
				})}>Card</Button>
				{this.elementTree}
			</div>
		);
	}
}

export default About;
