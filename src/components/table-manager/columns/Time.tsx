import React, { ReactNode } from 'react'
import moment from 'moment'
const Time = (time): ReactNode => {

  if (time) {
    return (
      <span>
        {moment(time).format('MM/DD/YYYY')}
        <br />
        {moment(time).format('HH:mm:ss')}
      </span>
    )
  }
}
export default Time