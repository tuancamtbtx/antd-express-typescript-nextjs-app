import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
const FilterForm: React.FC = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="ant-table-wrapper">
            <Form
                layout="inline"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="Domain"
                >
                    <Input placeholder="Domain" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        {'Search'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default FilterForm;