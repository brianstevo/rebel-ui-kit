import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './Carousel.css'
import Indicator from './Indicator/Indicator'

export interface CarouselProps {
  images?: string[]
  smIemsPerView?: 1 | 2
  mdItemsPerView?: 1 | 2
  lgitemsPerView?: number
  delay?: number
  autoPlay?: boolean
  autoPlayDirection?: 'left' | 'right'
  scrollingCount?: number
}

const Carousel = ({ images, smIemsPerView = 1, mdItemsPerView = 1, lgitemsPerView = 2, delay = 2000, autoPlay = false, autoPlayDirection = 'left', scrollingCount = 1 }: CarouselProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  // let imageLength = useRef<number>(0)
  const [imageLength, setImageLength] = useState(0)
  let imageItems = useRef<HTMLElement[]>([])
  let imageItemsHolder = useRef<HTMLElement[]>([])
  let totalScroll = useRef<number>(0)
  const [current, setCurrent] = useState(0)
  const autoScroll = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    imageItems.current = Array.from(imageWrapperRef.current?.querySelectorAll('.image-wrapper > *') || [], (el) => el as HTMLElement)
    imageItemsHolder.current = imageItems.current
    setImageLength(imageItems.current.length)
    if (imageWrapperRef.current) {
      imageWrapperRef.current.style.setProperty('--per-sm-view', String(smIemsPerView))
      imageWrapperRef.current.style.setProperty('--per-md-view', String(mdItemsPerView))
      imageWrapperRef.current.style.setProperty('--per-lg-view', String(lgitemsPerView))
      for (let i = 0; i < lgitemsPerView; i++) {
        if (imageItems.current[i]) {
          imageWrapperRef.current.insertAdjacentHTML('beforeend', imageItems.current[i].outerHTML)
        }
      }
      if (autoPlay) {
        let autoScrollInterval
        autoPlayDirection === 'left' ? (autoScrollInterval = setInterval(leftScrolling, delay)) : (autoScrollInterval = setInterval(rightScrolling, delay))
        autoScroll.current = autoScrollInterval
      }
    }

    return () => {
      if (autoScroll.current) {
        clearInterval(autoScroll.current)
      }
      if (imageItemsHolder.current) {
        imageItems.current = imageItemsHolder.current
      }
    }
  }, [])

  const leftScrolling = () => {
    totalScroll.current = totalScroll.current + scrollingCount
    setCurrent(totalScroll.current)
    if (totalScroll.current >= imageLength + 1) {
      if (autoScroll.current) {
        clearInterval(autoScroll.current)
      }
      totalScroll.current = scrollingCount
      setCurrent(totalScroll.current)
      updateLeftPosition(0, 0)
      if (imageWrapperRef.current) {
        const autoScrollInterval = setInterval(leftScrolling, delay)
        autoScroll.current = autoScrollInterval
      }
    }
    updateLeftPosition(0.3, totalScroll.current)
  }

  const rightScrolling = () => {
    if (totalScroll.current === 0) {
      updateLeftPosition(0, imageLength)
    }
    if (totalScroll.current !== 0) {
      updateLeftPosition(0.3, totalScroll.current - scrollingCount)
    }
    if (totalScroll.current === 0) {
      updateLeftPosition(0.3, imageLength - scrollingCount)
      totalScroll.current = imageLength - scrollingCount
      setCurrent(totalScroll.current)
    } else {
      totalScroll.current = totalScroll.current - scrollingCount
      setCurrent(totalScroll.current)
    }
  }

  const handleNext = () => {
    totalScroll.current = totalScroll.current + scrollingCount
    setCurrent(totalScroll.current)
    if (totalScroll.current >= imageLength + 1) {
      totalScroll.current = scrollingCount
      setCurrent(totalScroll.current)
      updateLeftPosition(0, 0)
    }
    updateLeftPosition(0.3, totalScroll.current)
  }

  const handlePrevious = () => {
    if (totalScroll.current <= 0) {
      updateLeftPosition(0, imageLength)
    }
    if (totalScroll.current !== 0) {
      updateLeftPosition(0.3, totalScroll.current - scrollingCount)
    }
    if (totalScroll.current <= 0) {
      updateLeftPosition(0.3, imageLength - scrollingCount)
      totalScroll.current = imageLength - scrollingCount
      setCurrent(totalScroll.current)
    } else {
      totalScroll.current = totalScroll.current - scrollingCount
      setCurrent(totalScroll.current)
    }
  }

  const handleIndicatorClick = (scrollToPosition: number) => {
    totalScroll.current = scrollToPosition
    setCurrent(totalScroll.current)
    if (imageWrapperRef.current) {
      const widthEl = (imageWrapperRef.current?.querySelector('.image-wrapper > :first-child') as HTMLElement)?.offsetWidth || 0
      imageWrapperRef.current.style.transition = `0.3s`
      imageWrapperRef.current.style.left = `-${scrollToPosition * (widthEl + 24)}px`
    }
  }

  const updateLeftPosition = (transitionTime: number, CountForPositionCalculation: number) => {
    if (imageWrapperRef.current) {
      const widthEl = (imageWrapperRef.current?.querySelector('.image-wrapper > :first-child') as HTMLElement)?.offsetWidth || 0
      imageWrapperRef.current.style.transition = `${transitionTime}s`
      imageWrapperRef.current.style.left = `-${CountForPositionCalculation * (widthEl + 24)}px`
    }
  }
  return (
    <div className='carousel-container'>
      <div className='image-container'>
        <button className='prev-btn' onClick={handlePrevious}>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </button>
        <div className='image-wrapper' ref={imageWrapperRef}>
          <div>
            <img src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div>
          {/* <div>
            <img src='https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          </div> */}
        </div>
        <button className='next-btn' onClick={handleNext}>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
          </svg>
        </button>
        <Indicator imageLength={imageLength} currentScroll={current} onIndicatorClick={handleIndicatorClick} />
      </div>
    </div>
  )
}
export default Carousel
