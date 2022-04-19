// global
import { useRef, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
// recoil atoms
import { cursorColorAtom, cursorInnerPositionAtom, cursorIsActiveAtom } from '../../recoil_atoms/CursorAtom'
import { canvasAtom, canvasContextAtom } from '../../recoil_atoms/CanvasAtom'
// hooks
import useEventListener from '../../hooks/useEventListener'

export default function Cursor({  }) {
    // global vars
    const location = useLocation()
    // cursor vars
    const [cursorColor, setCursorColor] = useRecoilState(cursorColorAtom)
    const [cursorIsActive, setCursorIsActive] = useRecoilState(cursorIsActiveAtom)
    const [cursorInnerPosition, setCursorInnerPosition] = useRecoilState(cursorInnerPositionAtom)
    const [cursorFollowerPosition, setCursorFollowerPosition] = useState({ x: 0, y: 0 })
    // canvas vars
    const [canvas, setCanvas] = useRecoilState(canvasAtom)
    const [canvasContext, setCanvasContext] = useRecoilState(canvasContextAtom)
    // refs
    const cursorInnerRef = useRef()
    const cursorFollowerRef = useRef()
    const cursorTimeRef = useRef()
    const cursorRequestRef = useRef()


    const draw = (x, y) => {
        if (!canvasContext || location.pathname !== '/') return

        canvasContext.current.lineTo(x, y)
        canvasContext.current.closePath()
        canvasContext.current.stroke()
    }

    const onMouseMove = useCallback((cursorInnerPosition) => {
        const cursorInnerX = cursorInnerPosition.x - 10
        const cursorInnerY = cursorInnerPosition.y - 10
        cursorInnerRef.current.style.left = `${cursorInnerX}px`
        cursorInnerRef.current.style.top = `${cursorInnerY}px`

        // canvasContext.current.beginPath()
        // canvasContext.current.moveTo(cursorInnerX, cursorInnerY)
    }, [cursorInnerPosition])

    const cursorFollowerAnimation = useCallback((time, isActive, cursorInnerPos) => {
        if (time !== undefined) {
            cursorFollowerPosition.x += (cursorInnerPos.x - 20 - cursorFollowerPosition.x) / 10
            cursorFollowerPosition.y += (cursorInnerPos.y - 20 - cursorFollowerPosition.y) / 10
            cursorFollowerRef.current.style.top = cursorFollowerPosition.y + 'px'
            cursorFollowerRef.current.style.left = cursorFollowerPosition.x + 'px'
            if (isActive) {
              draw(cursorFollowerPosition.x, cursorFollowerPosition.y)
            }
        }

        cursorRequestRef.current = requestAnimationFrame(() => cursorFollowerAnimation(isActive, cursorInnerPos))
    }, [cursorRequestRef])

    useEffect(() => {
        cursorRequestRef.current = requestAnimationFrame(() => cursorFollowerAnimation(cursorTimeRef.current, cursorIsActive, cursorInnerPosition))
    }, [cursorFollowerAnimation])

    useEffect(() => {
        onMouseMove(cursorInnerPosition)
    }, [cursorInnerPosition])
    
    return (
      <div className='cursor'>
        <div className='cursor__inner' ref={cursorInnerRef} style={{ background: cursorColor }} />
        <div className='cursor__follower' ref={cursorFollowerRef} />
      </div>
    )
  }