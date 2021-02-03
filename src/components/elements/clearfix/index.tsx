import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: block;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`

interface IProps {
    width: number,
    height: number
}
const ClearFix: React.FC<IProps> = ({ width, height }: IProps) => {
    return (
        <Div
            className='clearfix'
            width={width}
            height={height}
        />
    )
}
export default ClearFix;