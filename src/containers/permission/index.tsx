import React, { useEffect, useState } from 'react'

import Text from 'src/components/elements/text'
import RemovePermission from './remove'
import DividerComponent from 'src/components/elements/divider'
import FilterForm from './filter'
import CreatePermission from './create'
import UpdatePermission from './update'
import moment from 'moment'
import { AppleOutlined, ApiOutlined } from '@ant-design/icons'
import { Table, Tag } from 'antd'
import { IPermission } from 'src/types/permissions'
import { ContentWrapper, HeaderWrapper } from 'src/components/wrapper'
import { PermissionTypeColumn, TimeColumn } from 'src/components/table-manager/columns'

const time: string = moment().format('YYYY-MM-DD HH:mm:ss');
const data: IPermission[] = [
    {
        key: '1',
        name: 'GET_LIST_USER',
        status: 'Active',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'APP'

    },
    {
        key: '2',
        name: 'VIEW_USER',
        status: 'Active',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'APP'

    },
    {
        key: '3',
        name: 'UPDATE_USER_API',
        status: 'Active',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'API'

    },
    {
        key: '5',
        name: 'REMOVE_USER_API',
        status: 'Active',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'API'

    },
    {
        key: '6',
        name: 'REMOVE_PERMISSION_API',
        status: 'Active',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'API'

    },
    {
        key: '7',
        name: 'GET_LIST_USER_API',
        status: 'InActive',
        createdBy: 'tuannv6',
        createdTime: time,
        type: 'API'

    },
];
const columns: any[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: name => {
            return <Text color="#3498db" isUpper={false} fontWeight={700} content={name} />
        }

    },
    {
        title: 'Permission Type',
        dataIndex: 'type',
        key: 'type',
        render: type => {
            if (type == 'APP') {
                return <PermissionTypeColumn type={type} icon={<AppleOutlined />} />
            } else {
                return <PermissionTypeColumn type={type} icon={<ApiOutlined />} />
            }
        },
        align: 'center'

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            if (status === "Active") {
                return <Tag color="#27ae60">{status}</Tag>
            } else {
                return <Tag color="#e74c3c">{status}</Tag>
            }

        },
    },
    {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: name => {
            return <Text isUpper={false} fontWeight={600} content={name} />
        }
    },
    {
        title: 'Created Time',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: TimeColumn
    },
    {
        title: 'Action',
        dataIndex: 'key',
        key: 'key',
        render: key => {
            return (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <UpdatePermission id={key} initValue={data[0]} />
                    <DividerComponent type="vertical" />
                    <RemovePermission />
                </div>
            )
        },
    }

];
const UserContainer: React.FC = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(data)
    });
    return (
        <ContentWrapper>
            <HeaderWrapper>
                <h1>List Permissions</h1>
                <CreatePermission />
            </HeaderWrapper>
            <FilterForm />
            <Table id='key' columns={columns} dataSource={users} />
        </ContentWrapper>
    )
}
export default UserContainer