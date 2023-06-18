import React, { ReactNode } from 'react'
import style from './FlexGrid.module.css'

export interface FlexLayoutProps {
  className?: string
  children?: ReactNode
}

export interface FlexColumnProps {
  className?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  children?: ReactNode
}

const FlexContainer = ({ className = '', children }: FlexLayoutProps) => {
  return <div className={`${style['flex-container']} ${className}`}>{children}</div>
}

const FlexRow = ({ className = '', children }: FlexLayoutProps) => {
  return <div className={`${style['flex-row']} ${className}`}>{children}</div>
}

const FlexColumn = ({ className = '', xs = '', sm = '', md = '', lg = '', xl = '', children }: FlexColumnProps) => {
  return <div className={`${xs && style[`flex-col-xs-${xs}`]} ${sm && style[`flex-col-sm-${sm}`]} ${md && style[`flex-col-md-${md}`]} ${lg && style[`flex-col-lg-${lg}`]} ${xl && style[`flex-col-xl-${xl}`]} ${className && className}`}>{children}</div>
}

export { FlexContainer, FlexRow, FlexColumn }
