import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useRecoilState } from 'recoil';
import { currentRouteIndexAtom } from "../recoil_atoms/RouteAtom"
import FixedNav from './components/FixedNav'
import Home from './components/Home'
import Menu from './components/Menu'



function App() {
  const navigateTo = useNavigate()
  // history.push("/home")
  const location = useLocation()
  const [currentRouteIndex, setCurrentRouteIndex] = useRecoilState(currentRouteIndexAtom)
  const routes = [
    '/',
    '/about',
    '/skills',
    '/works'
  ]

  useEffect(() => {
    setCurrentRouteIndex(routes.indexOf(location.pathname))
  }, [])
  
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

  return (
    <div className="app" onWheel={onScroll}>
      <Routes>
        {console.log('render')}
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      <div className="menu">
        
      </div>
      <div className="cursor"/>
      <FixedNav />
      <Menu />
    </div>
  )
}

export default App
