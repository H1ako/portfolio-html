// global
import { useRef, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
// recoil atoms
import { cursorColorAtom } from '../../recoil_atoms/CursorAtom'
// hooks
import useEventListener from '../../hooks/useEventListener'

export default function Cursor({
    canvas,
    outerScale = 1.5,
    innerScale = 1.2,
    outerSpeedSlow = 50,
    outerSpeedDefault = 10,
  }) {
    const location = useLocation()
    // for cursor body
    const cursorOuterRef = useRef()
    const cursorInnerRef = useRef()
    let isActive = useRef(false)
    // for cursor outer position
    const requestRef = useRef()
    const previousTimeRef = useRef()
    const outerSpeed = useRef(outerSpeedDefault)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    let endX = useRef(0)
    let endY = useRef(0)
    // for cursor and drawing colors
    const [currentColor, setCurrentColor] = useRecoilState(cursorColorAtom)
    // for drawing board
    let canvasContext = useRef(null)

    const draw = (x, y) => {
      if (!canvasContext.current) return
      canvasContext.current.lineTo(x, y)
      canvasContext.current.closePath()
      canvasContext.current.stroke()
    }

    // for moving mouse inner
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
    // for moving cursor outer
    const animateOuterCursor = useCallback(
      (time) => {
        if (previousTimeRef.current !== undefined) {
          coords.x += (endX.current - coords.x) / outerSpeed.current
          coords.y += (endY.current - coords.y) / outerSpeed.current
          cursorOuterRef.current.style.top = coords.y + 'px'
          cursorOuterRef.current.style.left = coords.x + 'px'
          if (isActive.current) {
            draw(coords.x+20, coords.y+20)
          }
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animateOuterCursor)
      },
      [requestRef]
    )
    // for setting default drawing board
    // and reload it when window's width and height changes
    useEffect(() => {
      canvas.current.width = window.innerWidth * 2
      canvas.current.height = window.innerHeight * 2
      canvas.current.style.width = window.innerWidth + 'px'
      canvas.current.style.height = window.innerHeight + 'px'

      const ctx = canvas.current.getContext('2d')
      ctx.scale(2, 2)
      ctx.fillStyle = currentColor
      ctx.strokeStyle = currentColor
      ctx.shadowColor = 'black'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 10
      ctx.lineWidth = 10
      canvasContext.current = ctx
    }, [window.innerWidth, window.innerHeight])

    // for changing cursor and drawing color
    useEffect(() => {
      canvasContext.current.fillStyle = currentColor
      canvasContext.current.strokeStyle = currentColor
    }, [currentColor])
    
    // for animate cursor outer
    useEffect(() => requestRef.current = requestAnimationFrame(animateOuterCursor), [animateOuterCursor])

    const onMouseDown  = useCallback(() => {
      if (location.pathname !== '/') return
      outerSpeed.current = outerSpeedSlow
      isActive.current = true
    }, [location])
    const onMouseUp    = useCallback(() => {
      outerSpeed.current = outerSpeedDefault
      isActive.current = false
    }, [])

    useEventListener('mousemove', onMouseMove, document)
    useEventListener('mousedown', onMouseDown, document)
    useEventListener('mouseup', onMouseUp, document)
    // for changing cursor on every click
    useEffect(() => {
      if (isActive.current) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`
        cursorOuterRef.current.style.transform = `scale(${outerScale})`
      } else {
        cursorInnerRef.current.style.transform = 'scale(1)'
        cursorOuterRef.current.style.transform = 'scale(1)'
      }
    }, [innerScale, outerScale, isActive])

    return (
      <>
        <div className='cursor' ref={cursorInnerRef} style={{background: currentColor}} />
        <div className='cursor-follower' ref={cursorOuterRef} />
      </>
    )
  }