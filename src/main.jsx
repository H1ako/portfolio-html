// styles
import './styles/index.scss'
// global dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from 'recoil'
// components
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
			<BrowserRouter >
      	<App />
			</BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
