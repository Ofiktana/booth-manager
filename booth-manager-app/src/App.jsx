import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/index'
import Home from './pages/landing-page/Home'

import './App.css'
import Standard from './components/layouts/Standard'
import AuthRequired from './components/layouts/AuthRequired'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Standard />}>
            <Route index element={<Auth />} />
            <Route element={<AuthRequired />}>
              <Route path='/home' element={<Home />} /> 
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
