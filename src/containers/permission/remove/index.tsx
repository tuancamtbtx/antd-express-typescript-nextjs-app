import React, { useState } from 'react'
import Modal from 'src/components/elements/modal-normal'
import Notification from 'src/components/elements/noitication'
const RemovePermissionContainer: React.FC = () => {
  const onSubmit = async (): Promise<void> => {
    Notification({
      type: 'success',
      message: 'Remove',
      description: 'Success'
    })
  }
  const [visible, setVisible] = useState(false)
  const showModal = (): void => {
    setVisible(true)
  }
  const handleCancel = (): void => {
    setVisible(false)
  }
  const handleOk = (): void => {
    onSubmit()
    setVisible(false)
  }
  return (
    <div>
      <Modal
        visible={visible}
        showModal={showModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
        type="text" title="Delete" text="Delete">
        <p>You definitely want to delete it!</p>
      </Modal>
    </div>
  )
}
export default RemovePermissionContainer;