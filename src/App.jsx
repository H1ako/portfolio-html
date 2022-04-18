//global dependencies
import { useState, useEffect, useRef } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// recoil atoms
import { routesAtom } from "../recoil_atoms/RouteAtom"
// components
import FixedNav from './components/FixedNav'
import Cursor from "./components/Cursor"
import Menu from './components/Menu'
// pages
import Home from './components/pages/Home'
import About from "./components/pages/About"
import Works from "./components/pages/Works"
import Skills from "./components/pages/Skills"

function App() {
  const navigateTo = useNavigate()
  const location = useLocation()
  // for routing
  const routes = useRecoilValue(routesAtom)
  const [currentRouteIndex, setCurrentRouteIndex] = useState('/')
  // for drawing board
  const canvas = useRef()

  // for redirecting user to the next or prev route on scroll
  const onScroll = e => {
    // scroll down
    if (e.deltaY > 0 && currentRouteIndex < routes.length - 1) {
      navigateTo(routes[currentRouteIndex + 1].url)
      setCurrentRouteIndex(currentRouteIndex + 1)
      return
    }
     // scroll up
    if (e.deltaY < 0 && currentRouteIndex > 0) {
      navigateTo(routes[currentRouteIndex - 1].url)
      setCurrentRouteIndex(currentRouteIndex - 1)
    }
  }
  // for setting current route index when url changes
  useEffect(() => {
    for (let routeIndex=0; routeIndex < routes.length; routeIndex++) {
      if (routes[routeIndex].url === location.pathname) {
        setCurrentRouteIndex(routeIndex)
        break
      }
    }
  }, [location.pathname])

  return (
    // this is for disabling selecting if current route is home
    <div className={`app${location.pathname === '/' ? ' no-select' : ''}`} onWheel={onScroll}>
      <canvas ref={canvas} className='graph'/>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            unmountOnExit
            appear
            timeout={450}
            classNames='fade'
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/works" element={<Works />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      {/* this is for getting drawing board after rendering */}
      {canvas.current ? <Cursor canvas={canvas}/> : ''} 
      {canvas.current ? <FixedNav canvas={canvas}/> : ''}
      <Menu />
    </div>
  )
}

export default App
