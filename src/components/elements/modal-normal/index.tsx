import React, { ReactNode, useState } from 'react'
import { Button, Modal } from 'antd'

interface IProps {
  type?: 'default' | 'text' | 'link' | 'ghost' | 'primary' | 'dashed' | undefined,
  icon?: ReactNode,
  title: string,
  text: string,
  idForm?: string,
  disabled?: boolean
  onSubmitSuccess?: () => Promise<void>,
  hasFooter?: boolean,
  children: ReactNode,
  showModal: () => void,
  visible: boolean,
  handleOk: () => void,
  handleCancel: () => void
}
const ModalComponent: React.FC<IProps> = ({
  type,
  title,
  disabled,
  children,
  text,
  icon,
  showModal,
  visible,
  handleOk,
  handleCancel
}) => {
  return (
    <>
      <Button
        type={type}
        disabled={disabled}
        onClick={() => showModal()}
      >
        {icon}
        {text}
      </Button>
      <Modal
        width={600}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  )
}
export default ModalComponent