'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './Segment.module.css'
import { animated, useSpring, easings } from '@react-spring/web';

type SegmentType = {
    coordinate: { x: number, y: number },
    windowResolution: { width: number, height: number },
    resolution: { width: number, height: number },
    position: { top: number, left: number, direction: string, char: string, color: number },
    isClicked: boolean,
    clickedCordinate: { x: number, y: number },
    isRandom: boolean,
    randomData: { x: number, y: number, limit: number }
}

export default function Segment({ coordinate, windowResolution, resolution, position, isClicked, clickedCordinate, isRandom, randomData }: SegmentType) {
    let sizeResolution = resolution;

    const isEven = coordinate.y % 2 === 0;
    const x = coordinate.x - (isEven ? 0.5 : 0);
    const y = coordinate.y;

    const limit = 5;
    const distance = Math.sqrt(Math.pow(x - clickedCordinate.x, 2) + Math.pow(y - clickedCordinate.y, 2));

    const [scaleSpring, setScaleSpring] = useSpring(() => ({
        scale: (distance > limit ? limit : distance) / limit * 100 + '%',
        config: { duration: 0 }
    }))

    useEffect(() => {
        setScaleSpring({
            scale: (distance > limit ? limit : distance) / limit * 100 + '%',
            config: { duration: 0 }
        });
    }, [coordinate])

    // let count = 0;
    // let timer = 0;
    // let isMax = false;
    // const limit = 3;
    // const amplitude = 60;

    // const springConfig = {
    //     easings: easings.easeOutBack,
    //     duration: 100
    // }

    // const [clickProps, setClickProps] = useSpring(() => ({
    //     width: '100%',
    //     height: '100%',
    //     config: springConfig
    // }))

    // function click() {
    //     if (distance > limit) return;
    //     const ani = requestAnimationFrame(click);
    //     count++;
    //     if (count > distance * 4) {
    //         timer++;
    //         if (!isMax) {
    //             const amplitude_ = amplitude + ((90 - amplitude) * distance / limit);
    //             setClickProps({
    //                 width: amplitude_ + '%',
    //                 height: amplitude_ + '%',
    //                 config: springConfig
    //             })
    //             isMax = true;
    //         }
    //         if (isMax && timer > 50) {
    //             setClickProps({
    //                 width: '100%',
    //                 height: '100%',
    //                 config: springConfig
    //             })
    //             isMax = false;
    //             timer = 0;
    //             count = 0;
    //             cancelAnimationFrame(ani);
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (isClicked) {
    //         console.log('active');
    //         click();
    //     }
    // }, [isClicked]);


    // const randomDistance = Math.sqrt(Math.pow(coordinate.x - randomData.x / 100 * resolution.width, 2) + Math.pow(coordinate.y - randomData.y / 100 * resolution.height, 2));

    // let randomCount = 0;
    // let randomTimer = 0;
    // let randomIsMax = false;
    // const randomLimit = randomData.limit;
    // const randomAmplitude = 90;


    // const [randomProps, setRandomProps] = useSpring(() => ({
    //     width: '100%',
    //     height: '100%',
    //     config: springConfig
    // }))

    // function random() {
    //     if (randomDistance > randomLimit) return;
    //     const ani = requestAnimationFrame(random);
    //     randomCount++;
    //     if (randomCount > randomDistance * 30) {
    //         randomTimer++;
    //         if (!randomIsMax) {
    //             setRandomProps({
    //                 width: randomAmplitude + '%',
    //                 height: randomAmplitude + '%',
    //                 config: springConfig
    //             })
    //             randomIsMax = true;
    //         }
    //         if (randomIsMax && randomTimer > 200) {
    //             setRandomProps({
    //                 width: '100%',
    //                 height: '100%',
    //                 config: springConfig
    //             })
    //             randomIsMax = false;
    //             randomTimer = 0;
    //             randomCount = 0;
    //             cancelAnimationFrame(ani);
    //         }
    //     }

    // }

    // useEffect(() => {
    //     if (isRandom) {
    //         random();
    //     }
    // }, [isRandom]);

    const colors = ["#d93924", "#32823a", "#0e589d", "#ebca1a", "#692f1a"];


    return (
        <div className={styles.root} style={{
            overflow: "hidden",
            width: windowResolution.width / sizeResolution.width + "px",
            height: windowResolution.height / sizeResolution.height + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: windowResolution.width / resolution.width / 36 + "px",
            position: "relative",
            // backgroundColor: "black",
            // border: "1px solid white",
        }}>
            <animated.div style={{
                overflow: "hidden",
                width: scaleSpring.scale,
                height: scaleSpring.scale,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                maskImage: `url('/char2/${position.char}.svg')`,
                WebkitMaskImage: `url('/char2/${position.char}.svg')`,
                WebkitMaskSize: '100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                backgroundColor: `rgba(155, 0, 0, 1)`
            }}>
            </animated.div>
        </div>
    )
}