import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let lastWaitTimer = undefined;
const wait = (testFunc, launchFunc) => {
	if(lastWaitTimer){
		clearTimeout(lastWaitTimer);
		lastWaitTimer = undefined;
	}
	if(!testFunc()){
		lastWaitTimer = setTimeout(() => { wait(testFunc, launchFunc); }, 3000);
	} else {
		launchFunc();
	}
};
export default class DeskIframe extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const domNode = ReactDOM.findDOMNode(this);
		this.contentWindow = domNode.contentWindow;
		domNode.onload = (() => {
			const initPage = () => {
				this.contentWindow.__createPageDesk();
			};
			console.log(this.contentWindow);
			wait(() => this.contentWindow.pageReadyState === 'ready', initPage);
		})();
	}

	render(){
		return (
			<iframe id="mainFrame" style={this.props.style} src="//172.17.10.58:9000/lego-dev/dist/index.html" frameBorder="0"></iframe>
		)
	}
}