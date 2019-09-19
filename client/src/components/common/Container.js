import React from 'react'

const Container = ({ classname, children, key }) => {
  return <div className={classname} key={key}>{children}</div>
}

export default Container