import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageForDesk from './components/PageForDesk';
let page = "";
const render = () => {
	ReactDOM.render(
		<PageForDesk ref={(c)=>{page = c}}/>,
		document.getElementById('content')
	);
	window.setElementTree = function(name,props){
		page._setElementTree(name,props)
	};
};
window.pageReadyState = "";

window.__createPageDesk = function(){
	render();
	window.pageReadyState = 'initialized';
};



if (module.hot) {
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./components/PageForDesk.js'], () => {
		render();
	});
}

window.pageReadyState = 'ready';