import React, { ReactNode } from 'react'
import { Form } from 'antd'
interface IFormItem {
    initialValue?: any,
    name: string,
    label: ReactNode,
    rules: (rule, value) => Promise<void>,

}
interface IProps {
    id: string,
    layout: 'vertical' | 'horizontal' | 'inline',
    listForm: IFormItem[],
    nameForm: string,
    nameButton: string
    onSuccess: () => void,
    onFail: () => void,
    actionSubmit: (values: any) => Promise<void>
}
const Main: React.FC<IProps> = ({ id, onSuccess, onFail }) => {
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
    return (
        <Form
            form={form}
            id={id}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.List name="form">
                {listForm => (
                    <div>
                        {listForm.map(e => {

                        })}
                    </div>
                )}
            </Form.List>

        </Form>
    )
}
export default Main