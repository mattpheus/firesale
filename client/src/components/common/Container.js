import React from 'react'
import './container.css'

const Container = ({ classname, children, key }) => {
  return <div className={classname} key={key}>{children}</div>
}

export default Container