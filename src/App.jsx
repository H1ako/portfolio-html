import { useState, useEffect, useRef } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import FixedNav from './components/FixedNav'
import Cursor from "./components/Cursor"
import Menu from './components/Menu'
import Home from './components/Home'
import About from "./components/About"
import Works from "./components/Works"
import Skills from "./components/Skills"

function App() {
  const routes = [
    '/',
    '/about',
    '/skills',
    '/works'
  ]
  const navigateTo = useNavigate()
  const location = useLocation()
  const [currentRouteIndex, setCurrentRouteIndex] = useState(routes.indexOf(location.pathname))
  const [isCursor, setIsCursor] = useState(false)
  const canvas = useRef()
  
  const onScroll = e => {
    if (e.deltaY > 0 && currentRouteIndex < routes.length - 1) { // scroll down
      navigateTo(routes[currentRouteIndex + 1])
      setCurrentRouteIndex(currentRouteIndex + 1)
      
    }
    if (e.deltaY < 0 && currentRouteIndex > 0) { // scroll up
      navigateTo(routes[currentRouteIndex - 1])
      setCurrentRouteIndex(currentRouteIndex - 1)
    }
  }

  useEffect(() => {
    setCurrentRouteIndex(routes.indexOf(location.pathname))
  }, [location.pathname])
  
  useEffect(() => {
    setIsCursor(true)
  }, [])
  // const drawing = (e) => {
  //   const circle = new Path2D()
  //   circle.arc(cursorOutlinePos.x, cursorOutlinePos.y, 10, 1, 2 * Math.PI)
  //   // canvasContext.beginPath()
  //   // canvasContext.moveTo(e.pageX, e.pageY)
  //   // canvasContext.lineTo(e.pageX, e.pageY)
  //   // canvasContext.closePath()
  //   // canvasContext.stroke()
  //   canvasContext.fill(circle)
  // }

  return (
    <div className="app" onWheel={onScroll}>
      <canvas ref={canvas} className='graph'/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/works" element={<Works />} />
      </Routes>
      {isCursor ? <Cursor canvas={canvas}/> : ''}
      <FixedNav />
      <Menu />
    </div>
  )
}

export default App
