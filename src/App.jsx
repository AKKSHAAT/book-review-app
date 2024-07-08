import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'

function App() {

  return (
    <Routes>
    
      <Route path='/register' element={ <Registration /> }/>
      <Route path='/login' element={ <Login /> }/>
    </Routes>
  )
}

export default App
