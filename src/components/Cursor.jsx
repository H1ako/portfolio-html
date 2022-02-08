import { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react'
import useEventListener from '../../hooks/useEventListener'

export default function Cursor({
    canvas,
    outerScale = 1.5,
    innerScale = 1.2,
    firstColor = '#CBCDD0',
    accentColor = '#F331A6',
    mainColor = '#317FF3'
  }) {
    const cursorOuterRef = useRef()
    const cursorInnerRef = useRef()
    const requestRef = useRef()
    const previousTimeRef = useRef()
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [isActive, setIsActive] = useState(false)
    let endX = useRef(0)
    let endY = useRef(0)
    let canvasContext = useRef(null)

    const draw = (x, y) => {
      if (!canvasContext.current) return
      canvasContext.current.lineTo(x, y)
      canvasContext.current.closePath()
      canvasContext.current.stroke()
    }

    const onMouseMove = useCallback(({ clientX, clientY }) => {
      const x = clientX - 10
      const y = clientY - 10
      setCoords({ x: x, y: y })
      cursorInnerRef.current.style.top = y + 'px'
      cursorInnerRef.current.style.left = x + 'px'
      endX.current = clientX - 20
      endY.current = clientY - 20
      canvasContext.current.beginPath()
      canvasContext.current.moveTo(clientX, clientY)
    }, [])

    const animateOuterCursor = useCallback(
      (time) => {
        if (previousTimeRef.current !== undefined) {
          coords.x += (endX.current - coords.x) / 50
          coords.y += (endY.current - coords.y) / 50
          cursorOuterRef.current.style.top = coords.y + 'px'
          cursorOuterRef.current.style.left = coords.x + 'px'
          // console.log(isActive)
          draw(coords.x+20, coords.y+20)
        }
        console.log(isActive)
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animateOuterCursor)
      },
      [requestRef]
    )

    useEffect(() => {
      canvas.current.width = window.innerWidth * 2
      canvas.current.height = window.innerHeight * 2
      canvas.current.style.width = window.innerWidth + 'px'
      canvas.current.style.height = window.innerHeight + 'px'

      const ctx = canvas.current.getContext('2d')
      ctx.scale(2, 2)
      ctx.fillStyle = accentColor //mainColor
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = accentColor //mainColor
      ctx.shadowColor = 'black'
      ctx.shadowBlur = 10
      ctx.lineWidth = 10
      canvasContext.current = ctx
    }, [window.innerWidth, window.innerHeight])

    useEffect(() => requestRef.current = requestAnimationFrame(animateOuterCursor), [animateOuterCursor])

    const onMouseDown  = useCallback(() => setIsActive(true), [])
    const onMouseUp    = useCallback(() => setIsActive(false), [])

    useEventListener('mousemove', onMouseMove, document)
    useEventListener('mousedown', onMouseDown, document)
    useEventListener('mouseup', onMouseUp, document)

    useEffect(() => {
      if (isActive) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`
        cursorOuterRef.current.style.transform = `scale(${outerScale})`
      } else {
        cursorInnerRef.current.style.transform = 'scale(1)'
        cursorOuterRef.current.style.transform = 'scale(1)'
      }
    }, [innerScale, outerScale, isActive])

    return (
      <>
        <div className='cursor' ref={cursorInnerRef} />
        <div className='cursor-follower' ref={cursorOuterRef} />
      </>
    )
  }