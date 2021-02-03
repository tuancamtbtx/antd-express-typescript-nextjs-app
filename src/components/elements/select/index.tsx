import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { IOptionSelect } from 'src/types/shared'

interface IProps {
    list: IOptionSelect[],
    defaultValue?: string,
    mode?: 'multiple' | 'tags',
    placeholder?: string,
    onChange?: (value: string) => void
}
const Main: React.FC<IProps> = ({ onChange, list, defaultValue, mode, placeholder }: IProps) => {
    const handleChange = (value): void => {
        onChange(value)
    }
    return (
        <>
            <Select
                showSearch
                placeholder={placeholder}
                style={{ width: '100%' }}
                mode={mode}
                defaultValue={defaultValue}
                onChange={handleChange}>
                {list && list.map((e) => {
                    return <Option value={e.value} key={e.key}>{e.name}</Option>
                })}
            </Select>

        </>
    )
}

export default Main