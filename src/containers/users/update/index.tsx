import React, { useState } from 'react'
import UserFrom from '../form-common'
import Modal from 'src/components/elements/modal-footer'
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
            description: 'Permission'
        })
    }
    const onFail = () => {
        Notification({
            type: 'error',
            message: 'Update Error',
            description: 'Permission'
        })
    }
    return (
        <div>
            <Modal
                visible={visible}
                showModal={showModal}
                footer=
                {[
                    <Button type='primary' form="updateForm" key="submit" htmlType="submit">
                        {'Update'}
                    </Button>
                ]}
                handleOk={handleOk}
                handleCancel={handleCancel}
                type='text'
                title="Update" text="Update" >
                <UserFrom
                    onSuccess={onSuccess}
                    onFail={onFail}
                    id={'updateForm'} />
            </Modal>
        </div>
    )
}
export default CreateUserContainer;