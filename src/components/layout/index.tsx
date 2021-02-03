import React, { memo, ReactNode, useState } from 'react';
import { LayoutWrapper, ContentWrapper, LogoWrapper } from 'src/components/wrapper'
import { Layout, Menu } from 'antd';
import Head from 'next/head'
import UserDropDown from './user-dropdown'
const { Header, Sider, Content, Footer } = Layout
import { useRouter } from 'next/router'
import Link from 'src/components/link'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ApartmentOutlined
}
  from '@ant-design/icons'

type IProps = {
  title?: string,
  children?: ReactNode,
  activeMenuKey?: string
}

const BaseLayout: React.FC<IProps> = memo(({ title, activeMenuKey, children }: IProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  return (
    <LayoutWrapper>
      <Head>
        <title>{title} | ZMD CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Header id='headerNav'>
          <div style={{ 'display': 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <div style={{
              color: '#fff',
              fontSize: '18px',
              lineHeight: '64px',
              padding: '0 24px',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}>
              {collapsed ?
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(false)} /> :
                <MenuFoldOutlined className="trigger"
                  onClick={() => setCollapsed(true)} />}
            </div>
            <LogoWrapper>
              <img src='/static/images/log.png' />
            </LogoWrapper>
          </div>
          <UserDropDown username="Tuấn Cám" avatar="https://lh3.googleusercontent.com/ogw/ADGmqu_t6ocQYu86ewBqgpoKp35oKKv8l98N6RpyzL_L=s32-c-mo" />
        </Header>
        <Layout style={{ marginTop: '1px' }}>
          <Sider theme="light" trigger={null} collapsible collapsed={collapsed} style={{ padding: '0px' }}>
            <Menu selectedKeys={[activeMenuKey]} theme="light" mode="inline" >
              <Menu.ItemGroup key="g1" title="Administration">
                <Menu.Item key="/users">
                  <Link path='/users'>
                    <a>
                      <UserOutlined />
                      <span className='nav-text'>Users</span>
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/permissions">
                  <Link path='/permissions'>
                    <a>
                      <ApartmentOutlined />
                      <span className='nav-text'>Permissions</span>
                    </a>
                  </Link>

                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          </Sider>
          <Layout style={{ marginTop: '1px' }}>
            <Content style={{ overflow: 'initial', minHeight: '100vh' }}>
              <ContentWrapper>
                {children}
              </ContentWrapper>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©  {new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </LayoutWrapper>
  )
})
export default BaseLayout