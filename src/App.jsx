import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { ProfileCompletion } from './pages/ProfileCompletion'

function App() {

  return (
    <Routes>
    
      <Route path='/register' element={ <Registration /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/Profile-Completion' element={ <ProfileCompletion /> }/>

    </Routes>
  )
}

export default App
