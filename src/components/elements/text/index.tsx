import React from 'react'
interface IProps {
    content: string
    fontWeight?: number,
    color?: string,
    isUpper?: boolean
}
const Text: React.FC<IProps> = ({ content, fontWeight, color, isUpper = false }: IProps) => {
    return (
        <>
            <span
                style={{
                    fontWeight: fontWeight ? fontWeight : 700,
                    color: color ? color : '#2f3542'
                }}>
                {isUpper ? content.toUpperCase() : content}
            </span>
        </>
    )
}
export default Text