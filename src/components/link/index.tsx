import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
interface IProps {
  path: string,
  children: ReactNode
}
const Link: React.FC<IProps> = ({ path, children }) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(path)}>
      {children}
    </div>
  )
}
export default Link;