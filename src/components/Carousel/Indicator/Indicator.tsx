import React from 'react'
import './Indicator.css'

export interface IndicatorProps {
  imageLength: number
  currentScroll: number
  onIndicatorClick: any
}

const Indicator = ({ imageLength, currentScroll, onIndicatorClick }: IndicatorProps) => {
  const handleChangeOfCurrentScroll = (i: number) => {
    onIndicatorClick(i)
  }

  return (
    <div className='indicator-container'>
      {Array.from({ length: imageLength }, (_, i) => (
        <div className={currentScroll === i || (currentScroll === imageLength && i === 0) ? 'indicator-active indicator' : 'indicator'} key={i} onClick={(e) => handleChangeOfCurrentScroll(i)}></div>
      ))}
    </div>
  )
}

export default Indicator
