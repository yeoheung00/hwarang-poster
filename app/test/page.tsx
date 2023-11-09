'use client'

import { useState, TouchEvent } from 'react'
import styles from './page.module.css'

export default function Test() {
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  const touchStart = (event: TouchEvent) => {
    setIsTouch(true);
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchMove = (event: TouchEvent) => {
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchEnd = (event: TouchEvent) => {
    setIsTouch(true);
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchCancel = (event: TouchEvent) => {
    setCoordinate({ x: -999, y: -999 })
  }

  return (
    <main onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchCancel={touchCancel} className={styles.root}>
      <div className={styles.display}>
        <h1>X: {coordinate.x}</h1>
        <h1>y: {coordinate.y}</h1>
      </div>
    </main>
  )
}