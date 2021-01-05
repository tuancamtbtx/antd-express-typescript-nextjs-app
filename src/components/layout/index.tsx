import { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router'

import {
    TeamOutlined,
} from '@ant-design/icons'

import './Layout.less';

const { Item } = Menu;
const { Sider, Content } = Layout;

interface Props {
    router: any
}

function itemRender(route: any, params: any, routes: any, paths: string[]) {
    return route.path === 'index' ? (
        <Link href={'/'}><a>{route.breadcrumbName}</a></Link>
    ) : (
            <span>{route.breadcrumbName}</span>
        );
}

function routesMaker(pathsplit: string[]) {
    let routes = [
        {
            path: 'index',
            breadcrumbName: 'home',
        }
    ];
    for (let v of pathsplit) {
        const pathInfo = {
            path: v,
            breadcrumbName: v,
        }
        if (v !== "") routes.push(pathInfo)
    }
    return routes
}

class AppLayout extends Component<Props> {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    };

    render() {
        const pathname = this.props.router.pathname;
        const pathsplit: string[] = pathname.split('/');
        const routes = routesMaker(pathsplit);
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    theme={'light'}
                    collapsible collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Link href="/users">
                        <a><div className="App-logo" /></a>
                    </Link>
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['/users']}
                        selectedKeys={[pathsplit.pop()]}
                        defaultOpenKeys={[pathsplit[1]]}
                        mode="inline">
                        <Item key="users" icon={<TeamOutlined />}>
                            <Link href="/"><a>Users</a></Link>
                        </Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 16px 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={routes} />
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 16,
                            minHeight: 280,
                            backgroundColor: '#ffffff',
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AppLayout)
