import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import { fromJS,Map } from 'immutable';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.appendComponent = this.appendComponent.bind(this);
    this.state = {
      components: fromJS([]),
      componentsList: fromJS({}),
      modalShow: false,
      selectItem:0
    };
  }
  appendComponent(name, props) {
    if (!name) {
      return;
    }
    let that = this;
    props = fromJS({
      ...props,
      onClick: this.showProps.bind(this,this.state.components.size)
    });
    fetch('http://172.17.10.58:9000/api/component?componentName=' + name)
      .then((res) => {
        return res.json();
      }).then((json) => {
        // console.log(json.component.fileContent);
        let Com = eval(json.component.fileContent).default;
        that.setState((state) => {
          console.log(props);
          return {
            components: state.components.push(Map({
              Component: Com,
              props: props,
              key: state.components.size
            })),
            componentsList: state.componentsList.merge(Map(
              {
                name: {
                  componentName: name,
                  Component: Com,
                  props: props
                }
              }))
          }
        })
      })
  }

  showProps = (key) => {
    console.log(key);
    this.setState({
      modalShow: true,
      selectItem:key
      // selectKey
    });
  }
  buttonClick(name, props) {
    this.appendComponent(name, props);
  }

  handleOk = (e) => {
    let newText = "";
    if (this.inputText) {
      newText = this.inputText.refs.input.value
    }
    this.setState((state) => {
      return {
        modalShow: false,
        components:state.components.setIn([state.selectItem,'props','text'],newText)
      }
      // components:this.state.components
    });
  }
  handleCancel = (e) => {
    this.setState((state) => {
      return {modalShow: false}
    });
  }

  render() {
    const { components } = this.state;
    const getComponent = () => {
      return components.toJS().map((item, index) => {
        const Com = item.Component
        // Com.props = item.Component.props
        return <Com {...item.props} key={item.key} ref={item.key}/>;
      })
    }
    return (
      <div className="App">
        <Button type="primary" onClick={this.buttonClick.bind(this, 'AvatarCard', {
          imgSrc: "https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
        })}>Avatar</Button>
        <Button type="primary" onClick={this.buttonClick.bind(this, 'Card', {
          text: "https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
        })}>Card</Button>
        <Modal title="Basic Modal" visible={this.state.modalShow}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <Input placeholder="text值" ref={(c) => { this.inputText = c }} />
        </Modal>
        {getComponent()}
      </div>
    );
  }
}

export default App;
