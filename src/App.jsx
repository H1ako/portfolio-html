import { useState } from 'react'
import FixedNav from './components/FixedNav'
import Home from './components/Home'
import Menu from './components/Menu'

function App() {

  return (
    <div className="app">
      <Home />
      <div className="menu">
        
      </div>
      <div className="cursor"/>
      <FixedNav />
      <Menu />
    </div>
  )
}

export default App
