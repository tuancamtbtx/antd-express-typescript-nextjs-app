// export const name: string = 'user-dropdown';
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, message } from 'antd'
import { LogoutOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
const Wrapper = styled.a`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    margin-right: 8px;
  }
  .fullname {
    font-weight: 700;
    color: white;
    margin-right: 4px;
  }
`
type IUserProps = {
    username?: string,
    avatar: string
}

const menu = (
    <Menu>
        <Menu.Item>
            <a target='_blank' rel='noopener noreferrer'>
                <EditOutlined />
                Đổi mật khẩu
            </a>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => console.log("logout")} target='_blank' rel='noopener noreferrer'>
                <LogoutOutlined />
                Đăng Xuất
            </a>
        </Menu.Item>
    </Menu>
)
const UserDropDown: React.FC<IUserProps> = ({ username, avatar }: IUserProps) => {
    return (
        <Dropdown overlay={menu}>
            <Wrapper className='ant-dropdown-link' href='#'>
                <img src={avatar ? avatar : "https://dongphucsongphu.com/logo-tiki-dongphucsongphu-02.png"} alt={username} />
                <span className='fullname'>{username? username : "Tiki Dev"}</span>
                <DownOutlined />
            </Wrapper>
        </Dropdown>
    )
}
export default UserDropDown;