import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Wrapper = styled.div`
  margin-top: 240px;
  .logo {
    height: 64px;
    width: 80px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 24px;
  }
  .login-form {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .login-form-button {
    width: 100%;
  }
`

const LoginContainer: React.FC = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Wrapper>
            <img className='logo' src='https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/User_login_man_profile_account.png' />
            <Form
                className='login-form'
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input
                        type='password'
                        placeholder='Password'
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        {'Log in'}
                    </Button>
                </Form.Item>

            </Form>
        </Wrapper >

    )
}
export default LoginContainer