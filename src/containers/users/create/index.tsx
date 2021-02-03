import React, { useState } from 'react'
import UserFrom from '../form-common'
import Modal from 'src/components/elements/modal-footer'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Notification from 'src/components/elements/noitication'
const CreateUserContainer: React.FC = () => {

    const [visible, setVisible] = useState(false)
    const showModal = (): void => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const handleOk = () => {
        setVisible(false)
    }
    const onSuccess = (): void => {
        setVisible(false)
        Notification({
            type: 'success',
            message: 'Update Success',
            description: 'User'
        })
    }
    const onFail = () => {
        Notification({
            type: 'error',
            message: 'Update Error',
            description: 'User'
        })
    }
    return (
        <div>
            <Modal
                visible={visible}
                showModal={showModal}
                footer=
                {[
                    <Button type='primary' form="createForm" key="submit" htmlType="submit">
                        {'Create'}
                    </Button>
                ]}
                handleOk={handleOk}
                handleCancel={handleCancel}
                icon={<PlusCircleOutlined style={{ color: '#fff' }} />}
                type="primary" title="Create New" text="Create New">
                <UserFrom
                    onSuccess={onSuccess}
                    onFail={onFail}
                    id={'createForm'}
                />
            </Modal>
        </div>
    )
}
export default CreateUserContainer;