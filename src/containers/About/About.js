import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import './About.css';
import DeskIframe from '../../components/DeskIframe';
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
		const frameWindow = document.getElementById('mainFrame');
		// localStorage.setItem('123',123);
		console.log(JSON.stringify(this.elementTree));
		if(frameWindow){
			console.log(123);
			frameWindow.contentWindow.setElementTree(name,props);
		}
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
				{console.log(this.elementTree)}
				{this.elementTree}
				<DeskIframe />
			</div>
		);
	}
}

export default About;
