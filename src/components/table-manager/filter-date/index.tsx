import React from 'react'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
interface IProps {
  ranges?: any,
  onChange?: () => void
}

const FilterDate: React.FC<IProps> = ({ ranges, onChange }) => {
  const handleOnchange = (dates) => {
    console.log(`from: ${dates[0]} - to: ${dates[1]}`)
    onChange()
  }
  return (
    <>
      <RangePicker
        ranges={ranges}
        onChange={handleOnchange}
      />
    </>
  )
}

export default FilterDate;