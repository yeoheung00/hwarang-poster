'use client'
import styles from './page.module.css'
import Segment from 'components/Segment'
import { MouseEvent, useEffect, useState, TouchEvent } from 'react'

export default function Home() {
  const segmentRatio = { width: 18, height: 9 };
  const backgroundResolution = { width: 5120, height: 2880 };
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  const [windowResolution, setWindowResolution] = useState({ width: 0, height: 0 });
  const [segments, setSegments] = useState<{ top: number, left: number, direction: string, char: string, color: number }[][]>([]);



  useEffect(() => {
    //console.log('start');
    setWindowResolution({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", () => {
      setWindowResolution({ width: window.innerWidth, height: window.innerHeight });
    });
    random();
  }, []);

  useEffect(() => {
    //console.log('windowResolution', windowResolution);
    let tempResolution = { width: 16, height: 34 };
    tempResolution.width = Math.round(100 * windowResolution.width / windowResolution.height * segmentRatio.height / segmentRatio.width);
    tempResolution.height = 100;
    while (tempResolution.height > 0) {
      if (tempResolution.width * tempResolution.height < 300) break;
      tempResolution.height--;
      tempResolution.width = Math.round(tempResolution.height * windowResolution.width / windowResolution.height * segmentRatio.height / segmentRatio.width);
    }
    setResolution(tempResolution);
  }, [windowResolution]);

  useEffect(() => {
    const direction = windowResolution.width / windowResolution.height > backgroundResolution.width / backgroundResolution.height ? "width" : "height";

    let segments_temp: { top: number, left: number, direction: string, char: string, color: number }[][] = [];
    for (let y = 0; y < resolution.height; y++) {
      let row_temp: { top: number, left: number, direction: string, char: string, color: number }[] = [];
      for (let x = 0; x < resolution.width + (y % 2 === 0 ? 1 : 0); x++) {
        let top = 0;
        let left = 0;
        const char = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        const color = Math.floor(Math.random() * 5);
        if (direction === "height") {
          top = (windowResolution.height / resolution.height) * y * -1;
          left = (backgroundResolution.width / backgroundResolution.height * windowResolution.height - windowResolution.width) / -2 - windowResolution.width / resolution.width * x;
        }
        else if (direction === "width") {
          top = (backgroundResolution.height / backgroundResolution.width * windowResolution.width - windowResolution.height) / -2 - windowResolution.height / resolution.height * y;
          left = (windowResolution.width / resolution.width) * x * -1;
        }
        row_temp.push({ top: top, left: left, direction: direction, char: char, color: color });
      }
      segments_temp.push(row_temp);
    }
    setSegments(segments_temp);
  }, [resolution])

  const [clickedCordinate, setClickedCordinate] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  const handlerMouseDown = (event: MouseEvent) => {
    const clickedX = Math.floor(event.clientX / (windowResolution.width / resolution.width));
    const clickedY = Math.floor(event.clientY / (windowResolution.height / resolution.height));
    setClickedCordinate({ x: clickedX, y: clickedY });
    setIsClicked(true);
  }


  const handlerMouseUp = (event: MouseEvent) => {
    setIsClicked(false);
  }

  const [isRandom, setIsRandom] = useState(false);
  const [randomData, setRandomData] = useState({ x: 0, y: 0, limit: 0 });

  function random() {
    const timer = Math.floor(Math.random() * 3500) + 500;
    const rx = Math.floor(Math.random() * 100);
    const ry = Math.floor(Math.random() * 100);
    const limit = Math.random() * 1.5 + 2.5;
    setRandomData({ x: rx, y: ry, limit: limit });
    setIsRandom(true);
    setTimeout(() => { setIsRandom(false); }, 500);
    setTimeout(() => { random(); }, timer);
  }

  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  const touchStart = (event: TouchEvent) => {
    const clickedX = event.changedTouches[0].clientX / (windowResolution.width / resolution.width);
    const clickedY = event.changedTouches[0].clientY / (windowResolution.height / resolution.height);
    setCoordinate({ x: clickedX, y: clickedY });
  }

  const touchMove = (event: TouchEvent) => {
    const clickedX = event.changedTouches[0].clientX / (windowResolution.width / resolution.width);
    const clickedY = event.changedTouches[0].clientY / (windowResolution.height / resolution.height);
    setCoordinate({ x: clickedX, y: clickedY });
  }

  const touchEnd = (event: TouchEvent) => {
    const clickedX = event.changedTouches[0].clientX / (windowResolution.width / resolution.width);
    const clickedY = event.changedTouches[0].clientY / (windowResolution.height / resolution.height);
    setCoordinate({ x: clickedX, y: clickedY });
  }

  const touchCancel = (event: TouchEvent) => {
    setCoordinate({ x: -999, y: -999 })
  }


  const mouseMove = (event: MouseEvent) => {
    const clickedX = event.clientX / (windowResolution.width / resolution.width);
    const clickedY = event.clientY / (windowResolution.height / resolution.height);
    setCoordinate({ x: clickedX, y: clickedY });
  }


  return (
    <main className={styles.main}>
      <img className={styles.fixed} src='/front.svg' style={{ filter: 'drop-shadow(0 0 20px #000)' }} />
      {
        segments.map((row, row_idx) => <div key={row_idx} className={styles.row} style={{
          position: 'relative',
          top: '0px',
          left: row_idx % 2 === 0 ? windowResolution.width / resolution.width / 2 * -1 + 'px' : '0px'
        }}>
          {row.map((col, col_idx) => (<div key={col_idx} className={styles.col} style={{
            overflow: "visible",
            width: windowResolution.width / resolution.width + "px",
            height: windowResolution.height / resolution.height + "px",
          }}>
            <Segment coordinate={{ x: col_idx, y: row_idx }} windowResolution={windowResolution} resolution={resolution} position={segments[row_idx][col_idx]} isClicked={isClicked} clickedCordinate={coordinate} isRandom={isRandom} randomData={randomData} />
          </div>)
          )}
        </div>)
      }
      <div className={styles.feedback} onMouseDown={handlerMouseDown} onMouseMove={mouseMove} onMouseUp={handlerMouseUp} onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchCancel={touchCancel} />

    </main>
  )
}
