import React, { useEffect, useState } from 'react'
import UserApi from 'api/userApi'
import { Table } from 'antd'
import { IUserInfo } from 'types/users'
import { IColumnTable } from 'types/shared'
const data: IUserInfo[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const columns: IColumnTable[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',

    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const UserContainer: React.FC = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // async function loadUser() {
        //     let list = await UserApi.list()
        //     console.log(list)
        // }
        // loadUser();
        setUsers(data)


    });
    return (
        <div>
            <Table columns={columns} dataSource={users} />
        </div>
    )
}
export default UserContainer