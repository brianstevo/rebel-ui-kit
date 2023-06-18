import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import './Modal.css'

export interface ModalProps {
  open: boolean
  title: string
  width?: string
  setOpenModal: (value: boolean) => void
  children: ReactNode
}

const ModalContainer = ({ open, title, width = '500px', setOpenModal, children }: ModalProps) => {
  useEffect(() => {
    if (open && typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [open])

  return (
    <>
      {open && (
        <div
          className='overlay'
          onClick={() => {
            setOpenModal(false)
          }}
        >
          <div
            className='modalContainer'
            style={{ width: width }}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className='modalTitle'>
              <h3>{title}</h3>
              <button
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                &times;
              </button>
            </div>
            <div className='modalBody'>
              <p>{children}</p>
            </div>
            <div className='modalFooter'>
              <Button
                label='Cancel'
                className='mgR10'
                color='btn-outline-info'
                variant='outline'
                size='btn-md'
                onClick={() => {
                  setOpenModal(false)
                }}
              />
              <Button label='submit' color='btn-warning' size='btn-md' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Modal = ({ open, title, width, setOpenModal, children }: ModalProps) => {
  return <>{ReactDOM.createPortal(<ModalContainer open={open} title={title} width={width} setOpenModal={setOpenModal} children={children} />, document.getElementById('overlay-root') as HTMLElement)}</>
}

export default Modal
