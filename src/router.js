import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import About from './containers/About';
import App from './containers/App';
import NotFound from './containers/NotFound';
const { Header, Content, Footer, Sider } = Layout;

export default class Routes extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            mode: 'inline'
        }
        this.onCollapse = this.onCollapse.bind(this);
    }
    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {
        return (
            <Router>
                <Layout style={{height:'100%'}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" >LEGO</div>
                        <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/">
                                    <span>
                                        <Icon type="file" />
                                        <span className="nav-text">Home</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/about">
                                    <span>
                                        <Icon type="file" />
                                        <span className="nav-text">About</span>
                                    </span>
                                </Link>
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout>
                        {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
                        <Content style={{ margin: '0 16px' }}>
                            <Switch>
                                <Route exact path="/" component={App} />
                                <Route path="/about" component={About} />
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                    </Footer>
                    </Layout>
                </Layout>
            </Router>

        );
    }
}

/*export default class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/about" component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}*/