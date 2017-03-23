import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.appendComponent = this.appendComponent.bind(this);
    this.state = {
      components: []
    };
  }
  appendComponent(name, props) {
    if (!name) {
      return;
    }
    let that = this;
    fetch('http://172.17.10.58:9000/api/component?componentName='+name)
      .then((res)=>{
        return res.json();
      }).then((json)=>{
        // console.log(json.component.fileContent);
        let Com = eval(json.component.fileContent).default;
        let Component = <Com {...props } key={this.state.components.length}/>
        that.setState({
          components:[
            ...this.state.components,
            Component
            // <Com {...props} key={this.state.components.length}/>
          ]
        })
      })
  }

  buttonClick(name,props) {
    this.appendComponent(name, props);
  }

  render() {
    const { components } = this.state;
    console.log(components);
    const getComponent = () => {
      return components.map((item,index) => {
        return item;
      })
    }
    return (
      <div className="App">
        <Button type="primary" onClick={this.buttonClick.bind(this,'AvatarCard',{
          imgSrc:"https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
        })}>Avatar</Button>
        <Button type="primary" onClick={this.buttonClick.bind(this,'Card',{
          text:"https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
        })}>Card</Button>
        {getComponent()}
      </div>
    );
  }
}

export default App;
