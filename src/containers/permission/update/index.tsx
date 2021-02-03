import React, { useEffect, useState } from 'react'
import PermissionFrom from '../form-common'
import Modal from 'src/components/elements/modal-footer'
import { IPermission } from 'src/types/permissions'
import Notification from 'src/components/elements/noitication'
import { Button } from 'antd'
interface IProps {
  initValue: IPermission,
  id: string
}
const UpdatePermissionContainer: React.FC<IProps> = ({ initValue, id }) => {
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
        footer={[
          <Button onClick={() => setVisible(false)} form="updatePermssionForm" key="submit" htmlType="submit">
            {'Submit'}
          </Button>
        ]}
        type='text'
        title="Update" text="Update"
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <PermissionFrom
          onSuccess={onSuccess}
          onFail={onFail}
          isUpdate={true}
          initValue={initValue}
          id={'updatePermssionForm'} />
      </Modal>
    </div>
  )
}
export default UpdatePermissionContainer;