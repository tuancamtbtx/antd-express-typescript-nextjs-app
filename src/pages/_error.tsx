import React from 'react'
import ErrorPage from 'src/components/error'

function Error({ statusCode }) {
  return (
    <ErrorPage statusCode={statusCode} />
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? (res.statusCode) : (err ? err.statusCode : 404)
  return {
    statusCode
  }
}

export default Error
