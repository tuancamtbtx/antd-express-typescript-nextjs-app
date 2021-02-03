import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { IOptionSelect } from 'src/types/shared'
import Select from 'src/components/elements/select'
import Upload from 'src/components/elements/upload'

interface IProps {
    id: string,
    isUpdate?: boolean,
    onSuccess: () => void,
    onFail: () => void
}

const UserForm: React.FC<IProps> = ({ id, onSuccess, onFail }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        onSuccess()
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        onFail()
    };
    const listPermission: IOptionSelect[] = [
        {
            key: '1',
            value: 'VIEW_USER',
            name: 'VIEW_USER'

        },
        {
            key: '2',
            value: 'REVIEW_USER',
            name: 'REVIEW_USER'

        },
        {
            key: '3',
            value: 'ADD_PERMISSION',
            name: 'ADD_PERMISSION'

        }
    ]
    const listStatus: IOptionSelect[] = [
        {
            key: '1',
            value: 'APPROVE',
            name: 'APPROVE'
        },
        {
            key: '2',
            value: 'REJECTED',
            name: 'REJECTED',
        }
    ]
    const [status] = useState(listStatus)
    const [permissionApp] = useState(listPermission)
    return (
        <Form
            form={form}
            id={id}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Domain"
                name="domain"
                rules={[
                    {
                        required: true,
                        message: 'Please input your domain!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                    {
                        required: true,
                        message: 'Please upload your Avatar!',
                    },
                ]}
            >
                <Upload />
            </Form.Item>
            <Form.Item
                label="Permission API"
                name="permissionAPI"
                rules={[
                    {
                        required: true,
                        message: 'Please input your permission API!',
                    },
                ]}
            >
                <Select
                    placeholder="Select Permission API"
                    mode={'multiple'}
                    list={permissionApp} />
            </Form.Item>
            <Form.Item
                label="Permission APP"
                name="permissionAPP"
                rules={[
                    {
                        required: true,
                        message: 'Please input your permission APP!',
                    },
                ]}
            >
                <Select
                    placeholder="Select Permission APP"
                    mode={'multiple'}
                    list={permissionApp} />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[
                    {
                        required: true,
                        message: 'Please input your status!',
                    },
                ]}
            >
                <Select
                    placeholder="Select status"
                    list={status}
                />
            </Form.Item>

        </Form>

    )
}
export default UserForm