import React from 'react'
import './Alert.css'

export interface AlertProps {
  status: string
}

const Alert = ({ status = 'info' }: AlertProps) => {
  return (
    <>
      <div className={`alert ${status}`}>
        <div className='close'>&times;</div>
        <p>Alert message!</p>
      </div>
    </>
  )
}

export default Alert
