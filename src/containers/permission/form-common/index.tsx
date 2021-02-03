import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { IOptionSelect } from 'src/types/shared'
import Select from 'src/components/elements/select'
import { IPermission } from 'src/types/permissions'
interface IProps {
  id: string,
  isUpdate?: boolean,
  initValue?: IPermission,
  onSuccess: () => void,
  onFail: () => void
}

const PermissionForm: React.FC<IProps> = ({ onSuccess, onFail, id, isUpdate, initValue }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
    form.resetFields();
    onSuccess()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    onFail()
  };
  const listType: IOptionSelect[] = [
    {
      key: '1',
      value: 'APP',
      name: 'APP'

    },
    {
      key: '2',
      value: 'API',
      name: 'API'
    }

  ]
  const listStatus: IOptionSelect[] = [
    {
      key: '1',
      value: 'Active',
      name: 'Active'
    },
    {
      key: '2',
      value: 'InActive',
      name: 'InActive',
    }
  ]
  const [status] = useState(listStatus)
  const [type] = useState(listType)
  return (
    <Form
      form={form}
      initialValues={initValue}
      id={id}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name permission!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please input your type!',
          },
        ]}
      >
        <Select
          defaultValue={isUpdate ? initValue.type : null}
          placeholder="Select type"
          list={type}
        />
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
          defaultValue={isUpdate ? initValue.status : null}
          placeholder="Select status"
          list={status}
        />
      </Form.Item>

    </Form>

  )
}
export default PermissionForm