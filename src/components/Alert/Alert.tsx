import React, { useState } from 'react'
import style from './Alert.module.css'

export interface AlertProps {
  status: 'info' | 'success' | 'warning' | 'dark' | 'error'
  message: string
  disabled?: boolean
  // children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element) | any
}

const Alert = ({ status = 'info', message = 'Enter Valid Message', disabled = false }: AlertProps) => {
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow(!show)
  }
  return (
    <>
      {show && (
        <div className={`${style.alert} ${style[`${status}`]}`}>
          {!disabled && (
            <div className={`${style.close}`} onClick={handleClick}>
              &times;
            </div>
          )}
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

export default Alert
