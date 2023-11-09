'use client'

import { useState, TouchEvent, MouseEvent } from 'react'
import styles from './page.module.css'

export default function Test() {
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const touchStart = (event: TouchEvent) => {
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchMove = (event: TouchEvent) => {
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchEnd = (event: TouchEvent) => {
    setCoordinate({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  }

  const touchCancel = (event: TouchEvent) => {
    setCoordinate({ x: -999, y: -999 })
  }


  const mouseDown = (event: MouseEvent) => {
    setIsMouseDown(true);
    setCoordinate({ x: event.clientX, y: event.clientY });
  }

  const mouseMove = (event: MouseEvent) => {
    if (isMouseDown)
      setCoordinate({ x: event.clientX, y: event.clientY });
  }

  const mouseUp = (event: MouseEvent) => {
    setIsMouseDown(false);
    setCoordinate({ x: event.clientX, y: event.clientY });
  }

  return (
    <main onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchCancel={touchCancel} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} className={styles.root}>
      <div className={styles.display}>
        <h1>X: {coordinate.x}</h1>
        <h1>y: {coordinate.y}</h1>
      </div>
    </main>
  )
}