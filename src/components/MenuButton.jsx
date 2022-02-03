import { memo } from 'react'
import {} from 'recoil'

function MenuButton() {

  return (
    <div className="app">
      <div className="cursor"/>
      <button className='menu-btn'>
        <img className='menu-btn__icon' src="/assets/Menu.svg" alt="Menu" />
      </button>
      <Home />
    </div>
  )
}

export default memo(MenuButton)
