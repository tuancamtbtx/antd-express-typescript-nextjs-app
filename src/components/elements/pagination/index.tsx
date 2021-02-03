import React from 'react'
import { Pagination } from 'antd';

interface IPaginationProps {
    page: number,
    itemPerpage: number,
    total: number
}
const PaginationComponent: React.FC<IPaginationProps> = ({ page, itemPerpage, total }: IPaginationProps) => {
    return (
        <>
            <Pagination
                defaultCurrent={page}
                total={total}
                defaultPageSize={itemPerpage}
            />
        </>
    )
}
export default PaginationComponent