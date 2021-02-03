import { Modal, Button } from 'antd';
import React, { useState } from 'react'
const RemoveModal: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={showModal}>Delete</Button>
            <Modal title="Remove" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>You definitely want to delete it!</p>
            </Modal>
        </>
    )
}
export default RemoveModal;