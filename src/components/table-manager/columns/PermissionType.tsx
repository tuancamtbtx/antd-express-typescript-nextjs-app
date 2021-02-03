import React, { ReactNode } from 'react'
interface IProps {
  type: string,
  icon: ReactNode
}
const Type: React.FC<IProps> = ({ type, icon }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div>
        {icon}
      </div>
      <div>
        <span
          style={{
            backgroundColor: '#ecf0f1',
            color: '#2c3e50',
            border: '1px solid #2c3e50',
            padding: '2px',
            borderRadius: '4px'
          }}>
          {type}
        </span>
      </div>

    </div>
  )
}
export default Type;