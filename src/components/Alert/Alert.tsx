import React from 'react'
import styles from './Alert.module.css'

export interface AlertProps {
  status: string
}

const Alert = ({ status = 'info' }: AlertProps) => {
  return (
    <>
      <div className={`${styles.alert} ${styles.status}`}>
        <div className={styles.close}>&times;</div>
        <p>Alert message!</p>
      </div>
    </>
  )
}

export default Alert
