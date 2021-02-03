import React, { ReactNode, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'

interface IProps {
    type?: 'default' | 'text' | 'link' | 'ghost' | 'primary' | 'dashed' | undefined,
    icon?: ReactNode,
    title: string,
    text: string,
    disabled?: boolean
    onSubmitSuccess?: () => Promise<void>,
    footer: ReactNode,
    children: ReactNode,
    visible: boolean,
    showModal: () => void,
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
    footer,
    visible,
    showModal,
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
                footer={footer}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
        </>
    )
}
export default ModalComponent