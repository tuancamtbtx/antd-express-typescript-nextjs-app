import React, { memo, ReactNode, useState, useEffect } from 'react';
import { LayoutWrapper, ContentWrapper, LogoWrapper } from 'src/components/wrapper'
import { Layout, Menu } from 'antd';
import Head from 'next/head'
import UserDropDown from './user-dropdown'
const { Header, Sider, Content, Footer } = Layout
import styled from 'styled-components'
import { routerPath } from 'src/components/core/link';


const LogoName = styled.span`
	margin: 12px;
	font-size: 21px;
	line-height: 30px;
	font-weight: 700;
	color: #1b94fc;
`
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
  QuestionCircleOutlined
}
	from '@ant-design/icons'
import { useRouter } from 'next/router';


type IProps = {
	title?: string,
	children?: ReactNode,
	activeMenuKey?: string
}

const BaseLayout: React.FC<IProps> = memo(({ title, activeMenuKey, children }: IProps) => {
	const [collapsed, setCollapsed] = useState(false)
	const router = useRouter();


	useEffect(() => {

	}, [])
	return (
		<LayoutWrapper>
			<Head>
				<title>{title} | Antd CMS</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout>
				<Layout style={{ marginTop: '1px' }}>
					<Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
						{!collapsed && <LogoWrapper>
							<LogoName>CMS TIGER</LogoName>
						</LogoWrapper>}
						<Menu selectedKeys={[activeMenuKey]} theme="dark" mode="inline" >
							<Menu.ItemGroup key="g1" title="Administration">
								<Menu.Item key="/users" onClick={() => {
									router.push(...routerPath('/users'));
								}}>
									<UserOutlined />
									<span className='nav-text'>Users</span>
								</Menu.Item>
                <Menu.Item key="/permissions" onClick={() => {
									router.push(...routerPath('/permissions'));
								}}>
									<QuestionCircleOutlined />
									<span className='nav-text'>Permissions</span>
								</Menu.Item>
							</Menu.ItemGroup>
						</Menu>
					</Sider>
					<Layout className="site-layout" style={{ marginTop: '1px' }}>
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
											style={{ fontSize: '18px', color: 'white' }} className="trigger"
											onClick={() => setCollapsed(false)} /> :
										<MenuFoldOutlined
											style={{ fontSize: '18px', color: 'white' }} className="trigger"
											onClick={() => setCollapsed(true)} />}
								</div>
							</div>
							<UserDropDown username={"User"} avatar={"https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-images/e9fef2d083cf11ea8f996dbfbe6e50b1.jpg"} />
						</Header>
						<Content style={{ overflow: 'initial', minHeight: '100vh' }}>
							<ContentWrapper>
								{children}
							</ContentWrapper>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							©  {new Date().getFullYear()} Tuca Team
						</Footer>
					</Layout>
				</Layout>
			</Layout>
		</LayoutWrapper >
	)
})
export default BaseLayout