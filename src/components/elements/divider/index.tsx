import React from 'react'
import { Divider } from 'antd'
interface IProps {
    color?: string,
    type?: 'horizontal' | 'vertical';
}
const DividerComponent: React.FC<IProps> = ({ color, type }: IProps) => {
    return (
        <>
            <Divider style={{
                borderLeft: `1.25px solid ${color ? color : '#57606f'}`
            }} type={type} />
        </>

    )
}
export default DividerComponent