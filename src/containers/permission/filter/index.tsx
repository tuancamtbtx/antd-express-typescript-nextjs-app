import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import FilterDate from 'src/components/table-manager/filter-date'
import moment from 'moment'
import Select from 'src/components/elements/select'
import { IOptionSelect } from 'src/types/shared'
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
const FilterForm: React.FC = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [status] = useState(listStatus)

  return (
    <div className="ant-table-wrapper">
      <Form
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
        >
          <Input placeholder="Name Permission" />
        </Form.Item>
        <Form.Item
          name="createdBy"
        >
          <Input placeholder="Created By" />
        </Form.Item>
        <Form.Item
          name="status"
        >
          <Select
            placeholder="Select status"
            list={status}
          />
        </Form.Item>
        <Form.Item
          name="timeRange"
        >
          <FilterDate ranges={{ 'This Month': [moment().startOf('month'), moment().endOf('month')] }} />
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