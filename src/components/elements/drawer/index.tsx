import React, { ReactChild, ReactNode, useState } from 'react'
import { Button, Drawer } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

interface IProps {
    buttonTitle: string,
    drawerTitle: string,
    children: ReactChild
}
const CreateUserContainer: React.FC<IProps> = ({ buttonTitle, drawerTitle, children }: IProps) => {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                <PlusCircleOutlined style={{ color: '#fff' }} />
                {buttonTitle}
            </Button>
            <Drawer
                onClose={() => setVisible(false)}
                title={drawerTitle}
                width={720}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <div>
                    {children}
                </div>
            </Drawer>
        </div>
    )
}
export default CreateUserContainer;